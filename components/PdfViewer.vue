<template>
  <div class="pdf-viewer-root">
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
      <div>
        <h3 class="text-white font-semibold">{{ title }}</h3>
        <p class="text-white/40 text-sm">
          <template v-if="pages.length > 0">{{ pages.length }} páginas · {{ totalRows }} filas</template>
          <template v-else-if="loading">Extrayendo contenido...</template>
        </p>
      </div>
      <a :href="pdfUrl" :download="fileName" class="btn-primary inline-flex items-center gap-2" target="_blank">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        Descargar PDF
      </a>
    </div>

    <!-- SEARCH -->
    <div v-if="pages.length > 0" class="flex items-center gap-3 mb-6 flex-wrap">
      <div class="relative flex-1 min-w-[220px] max-w-lg">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar código, modelo, año..."
          class="pdf-search-input"
          @keyup.escape="clearSearch"
        />
        <button v-if="searchQuery" class="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors" @click="clearSearch">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <span v-if="searchQuery" class="text-sm">
        <span v-if="filteredPages.length" class="text-brand-red font-semibold">
          {{ filteredPages.length }} página{{ filteredPages.length !== 1 ? 's' : '' }} con coincidencias
        </span>
        <span v-else class="text-white/30">Sin resultados</span>
      </span>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="flex flex-col items-center gap-4 py-24 bg-brand-gray border border-white/10">
      <div class="spinner" />
      <p class="text-white/40 text-sm">Extrayendo contenido del catálogo...</p>
      <p v-if="loadingPage > 0" class="text-white/20 text-xs">Procesando página {{ loadingPage }} / {{ totalPdfPages }}...</p>
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="flex flex-col items-center gap-5 py-20 px-8 text-center bg-brand-gray border border-white/10">
      <div class="w-16 h-16 border border-brand-red/30 bg-brand-red/5 flex items-center justify-center">
        <svg class="w-8 h-8 text-brand-red/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <h4 class="text-white font-bold text-lg mb-1">No se pudo cargar el catálogo</h4>
      <p class="text-white/50 text-sm mb-4">{{ error }}</p>
      <a :href="pdfUrl" :download="fileName" class="btn-primary inline-flex items-center gap-2" target="_blank">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        Descargar PDF
      </a>
    </div>

    <!-- NO RESULTS -->
    <div v-else-if="searchQuery && filteredPages.length === 0" class="flex flex-col items-center gap-4 py-20 bg-brand-gray border border-white/10 text-center">
      <svg class="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <p class="text-white/40">No se encontró <span class="text-white/70 font-medium">"{{ searchQuery }}"</span></p>
      <button class="text-brand-red text-sm hover:underline" @click="clearSearch">Limpiar búsqueda</button>
    </div>

    <!-- CONTENT -->
    <div v-else-if="displayPages.length > 0" class="space-y-6">
      <div
        v-for="page in displayPages"
        :key="page.pageNum"
        class="bg-brand-gray border border-white/8 overflow-hidden"
      >
        <!-- Page header -->
        <div class="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-brand-black/30">
          <span class="text-white/30 text-xs font-medium tracking-widest uppercase">Página {{ page.pageNum }}</span>
          <span class="text-white/15 text-xs">{{ page.rows.length }} filas</span>
        </div>

        <!-- Cover image (page 1) -->
        <div v-if="page.imageUrl" class="bg-brand-black flex justify-center p-4">
          <img :src="page.imageUrl" class="max-w-full rounded" alt="Portada del catálogo" />
        </div>

        <!-- Catalog table — generic: works for both automotor (4 cols) and autobuses (7 cols) -->
        <div v-else-if="page.isTable" class="overflow-x-auto">
          <table :class="['pdf-table', page.colHeaders.length > 4 ? 'pdf-table--full' : 'pdf-table--compact']">
            <thead>
              <tr>
                <th v-for="h in page.colHeaders" :key="h">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(row, ri) in rowsForDisplay(page)" :key="ri">
                <tr v-if="row.isHeading" class="pdf-row-heading">
                  <td :colspan="page.colHeaders.length" v-html="highlightText(row.cells[0])" />
                </tr>
                <tr v-else class="pdf-row-data">
                  <td
                    v-for="(cell, ci) in row.cells"
                    :key="ci"
                    :class="cellClass(ci, page.colHeaders.length)"
                    v-html="highlightText(cell)"
                  />
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <!-- Plain text fallback -->
        <div v-else-if="!page.imageUrl" class="p-5 lg:p-8 space-y-1.5">
          <template v-for="(row, ri) in rowsForDisplay(page)" :key="ri">
            <p
              :class="row.isHeading ? 'text-white font-bold text-base leading-snug mt-3 first:mt-0' : 'text-white/70 text-sm leading-relaxed'"
              v-html="highlightText(row.cells[0])"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- Mobile sticky download -->
    <div class="md:hidden fixed bottom-6 right-6 z-40">
      <a :href="pdfUrl" :download="fileName" class="flex items-center gap-2 btn-primary shadow-lg px-4 py-3 text-sm" target="_blank">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        PDF
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RawItem {
  text: string
  fontSize: number
  x: number
  y: number
  bold: boolean
}

interface Row {
  cells: string[]
  isHeading: boolean
}

interface PageData {
  pageNum: number
  rows: Row[]
  colHeaders: string[]
  isTable: boolean
  imageUrl?: string
  rawText: string
}

interface Props {
  pdfUrl: string
  fileName: string
  title: string
  // Optional: explicit column headers → enables generic multi-column mode
  columnHeaders?: string[]
  // Skip the last PDF page (e.g. back-cover / legal page)
  skipLastPage?: boolean
}
const props = defineProps<Props>()

// True when the caller specifies custom column headers (e.g. autobuses catalog)
const isMultiCol = computed(() => !!props.columnHeaders && props.columnHeaders.length > 2)

const loading = ref(true)
const error = ref<string | null>(null)
const loadingPage = ref(0)
const totalPdfPages = ref(0)
const pages = ref<PageData[]>([])
const searchQuery = ref('')

const totalRows = computed(() =>
  pages.value.reduce((acc, p) => acc + p.rows.length, 0)
)

const filteredPages = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return pages.value
  return pages.value.filter(p => p.rawText.toLowerCase().includes(q))
})

const displayPages = computed(() => filteredPages.value)

function rowsForDisplay(page: PageData): Row[] {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return page.rows
  return page.rows.filter(row => row.cells.some(c => c.toLowerCase().includes(q)))
}

function cellClass(colIndex: number, numCols: number): string {
  if (colIndex === 0) return 'pdf-cell-code'
  if (colIndex === 1) return 'pdf-cell-detail'
  if (numCols === 4) {
    // Automotor: col 2 = N°original, col 3 = year
    return colIndex === 2 ? 'pdf-cell-nr' : 'pdf-cell-year'
  }
  // Generic (autobuses, etc.): spec columns
  return 'pdf-cell-spec'
}

function highlightText(text: string): string {
  const q = searchQuery.value.trim()
  if (!q) return escapeHtml(text)
  const regex = new RegExp(`(${escapeRegex(q)})`, 'gi')
  return escapeHtml(text).replace(regex, '<mark class="pdf-highlight">$1</mark>')
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function clearSearch() { searchQuery.value = '' }

// ── PDF.js extraction ──────────────────────────────────────────────────────
onMounted(async () => {
  try {
    const pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

    const pdfDoc = await pdfjsLib.getDocument(props.pdfUrl).promise
    totalPdfPages.value = pdfDoc.numPages

    const extracted: PageData[] = []

    const lastPage = props.skipLastPage ? pdfDoc.numPages - 1 : pdfDoc.numPages

    for (let pg = 1; pg <= lastPage; pg++) {
      loadingPage.value = pg
      const page = await pdfDoc.getPage(pg)
      const tc = await page.getTextContent()

      const items: RawItem[] = []
      for (const it of tc.items as any[]) {
        const str = (it.str ?? '').trim()
        if (!str) continue
        const tx = it.transform
        items.push({
          text: str,
          fontSize: Math.abs(Math.sqrt(tx[0] ** 2 + tx[1] ** 2)),
          x: tx[4],
          y: tx[5],
          bold: (it.fontName ?? '').toLowerCase().includes('bold'),
        })
      }

      // Page 1 → cover image
      if (pg === 1) {
        const canvas = document.createElement('canvas')
        const viewport = page.getViewport({ scale: 1.5 })
        canvas.width = viewport.width
        canvas.height = viewport.height
        await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise
        const imageUrl = canvas.toDataURL('image/jpeg', 0.9)
        extracted.push({ pageNum: pg, rows: [], colHeaders: [], isTable: false, imageUrl, rawText: '' })
        continue
      }

      if (items.length === 0) continue

      items.sort((a, b) => {
        const dy = b.y - a.y
        if (Math.abs(dy) > 4) return dy
        return a.x - b.x
      })

      let rows: Row[]
      let colHeaders: string[]
      let isTable: boolean

      if (isMultiCol.value) {
        // ── Generic multi-column mode (autobuses) ──────────────────────────
        const boundaries = findAllSplitPoints(items, props.columnHeaders?.length)
        isTable = boundaries.length >= 1
        rows = isTable ? buildGenericRows(items, boundaries) : buildTextRows(items)
        // Use provided headers, trimmed to actual detected column count
        const numCols = boundaries.length + 1
        colHeaders = (props.columnHeaders ?? []).slice(0, numCols)
      } else {
        // ── Automotor mode: 2 zones, split code+detail and nr+year ─────────
        const splitX = findSplitX(items)
        isTable = splitX !== null
        rows = isTable ? buildAutomotorRows(items, splitX!) : buildTextRows(items)
        colHeaders = ['Código', 'Detalle', 'N° Original', 'Año']
      }

      const rawText = rows.map(r => r.cells.join(' ')).join(' ')
      extracted.push({ pageNum: pg, rows, colHeaders, isTable, rawText })
    }

    pages.value = extracted
    loading.value = false
  } catch (e: any) {
    loading.value = false
    error.value = e?.message?.includes('404') || e?.message?.includes('fetch')
      ? 'El archivo PDF no fue encontrado. Asegurate de que esté en /public/catalogos/'
      : (e?.message ?? 'Error al procesar el PDF.')
  }
})

// ── Shared: group items into visual lines ───────────────────────────────────
function groupLines(items: RawItem[]): RawItem[][] {
  const lines: RawItem[][] = []
  let current: RawItem[] = [items[0]]
  let currentY = items[0].y
  for (let i = 1; i < items.length; i++) {
    if (Math.abs(items[i].y - currentY) <= 4) {
      current.push(items[i])
    } else {
      lines.push(current)
      current = [items[i]]
      currentY = items[i].y
    }
  }
  lines.push(current)
  return lines
}

function assignColumn(x: number, boundaries: number[]): number {
  for (let i = 0; i < boundaries.length; i++) {
    if (x < boundaries[i]) return i
  }
  return boundaries.length
}

function isInternalHeader(cells: string[]): boolean {
  const letters = cells.join('').replace(/[^a-zA-Z]/g, '').toUpperCase()
  return letters.length < 100 &&
    (letters.includes('CODIGO') || (letters.includes('DETALLE') && letters.length < 40))
}

// ── Automotor: single split, code+detail merge, nr+year split ───────────────
function findSplitX(items: RawItem[]): number | null {
  const xs = items.map(i => i.x).sort((a, b) => a - b)
  const minX = xs[0], maxX = xs[xs.length - 1]
  const range = maxX - minX
  if (range < 80 || items.length < 8) return null

  const BINS = 50, binSize = range / BINS
  const freq = new Array(BINS).fill(0)
  for (const x of xs) freq[Math.min(Math.floor((x - minX) / binSize), BINS - 1)]++

  let bestMid = -1, bestLen = 0, gapStart = -1, inGap = false
  for (let b = 0; b < BINS; b++) {
    if (freq[b] <= 1) { if (!inGap) { inGap = true; gapStart = b } }
    else {
      if (inGap) {
        const len = b - gapStart
        if (len > bestLen) { bestLen = len; bestMid = gapStart + len / 2 }
        inGap = false
      }
    }
  }
  if (bestLen < 3) return null
  const splitX = minX + bestMid * binSize
  const left = items.filter(i => i.x < splitX).length
  const right = items.filter(i => i.x >= splitX).length
  if (left < 3 || right < 3) return null
  return splitX
}

function splitNrYear(text: string): [string, string] {
  if (!text) return ['', '']
  // Pure year value (e.g. "1997", "97", "1997/2003", "97-03")
  if (/^\d{2,4}([\/\-]|$)/.test(text) && text.length <= 12) return ['', text]
  // Nr + year with range separator (e.g. "5553 1997/2003")
  const m = text.match(/^(.{5,}?)\s+(\d{2,4}[\/\-].+)$/)
  if (m) return [m[1].trim(), m[2].trim()]
  // Nr + bare year at end: 4-digit (1997) or 2-digit (97, 03) — needs ≥3 chars before it
  const m2 = text.match(/^(.{3,})\s+(\d{2,4})$/)
  if (m2) return [m2[1].trim(), m2[2]]
  return [text, '']
}

function buildAutomotorRows(items: RawItem[], splitX: number): Row[] {
  const lines = groupLines(items)
  const rows: Row[] = []

  for (const line of lines) {
    const leftItems = line.filter(i => i.x < splitX).sort((a, b) => a.x - b.x)
    const rightItems = line.filter(i => i.x >= splitX).sort((a, b) => a.x - b.x)
    const leftText = leftItems.map(i => i.text).join(' ').trim()
    const rightText = rightItems.map(i => i.text).join(' ').trim()
    const maxFont = Math.max(...line.map(i => i.fontSize))
    const anyBold = line.some(i => i.bold)

    const cells4 = [leftText, '', rightText, '']
    if (isInternalHeader(cells4)) continue

    const isHeading = maxFont >= 12.5 || anyBold
    if (isHeading) {
      const full = [leftText, rightText].filter(Boolean).join('  ')
      if (full) rows.push({ cells: [full, '', '', ''], isHeading: true })
      continue
    }

    const [nrOriginal, anio] = splitNrYear(rightText)
    const CODE_RE = /^(\d{4,6}[A-Za-z]{0,2})\s+(.+)$/
    const PURE_CODE_RE = /^\d{4,6}[A-Za-z]{0,2}$/
    const codeAndDetail = leftText.match(CODE_RE)

    if (codeAndDetail) {
      rows.push({ cells: [codeAndDetail[1], codeAndDetail[2], nrOriginal, anio], isHeading: false })
    } else if (PURE_CODE_RE.test(leftText)) {
      rows.push({ cells: [leftText, '', nrOriginal, anio], isHeading: false })
    } else if (!rightText) {
      rows.push({ cells: [leftText, '', '', ''], isHeading: true })
    } else {
      rows.push({ cells: [leftText, '', nrOriginal, anio], isHeading: false })
    }
  }
  return rows
}

// ── Generic multi-column: boundaries from header row, then gap fallback ──────
function findAllSplitPoints(items: RawItem[], targetCols?: number): number[] {
  // Strategy 1: use the PDF's own column-header row positions (exact)
  const fromHeader = boundariesFromHeaderRow(items)
  if (fromHeader.length >= (targetCols ? targetCols - 2 : 2)) return fromHeader

  // Strategy 2: pick the N-1 widest X-axis gaps
  const xs = items.map(i => i.x).sort((a, b) => a - b)
  const minX = xs[0], maxX = xs[xs.length - 1]
  const range = maxX - minX
  if (range < 60 || items.length < 6) return []

  const BINS = 100, binSize = range / BINS
  const freq = new Array(BINS).fill(0)
  for (const x of xs) freq[Math.min(Math.floor((x - minX) / binSize), BINS - 1)]++

  const gaps: { len: number; mid: number }[] = []
  let inGap = false, gapStart = -1
  for (let b = 0; b <= BINS; b++) {
    const empty = b < BINS && freq[b] === 0
    if (empty && !inGap) { inGap = true; gapStart = b }
    else if (!empty && inGap) {
      const len = b - gapStart
      if (len >= 1) gaps.push({ len, mid: gapStart + len / 2 })
      inGap = false
    }
  }

  const wantBoundaries = targetCols && targetCols > 1 ? targetCols - 1 : gaps.length
  const selected = gaps
    .sort((a, b) => b.len - a.len)
    .slice(0, wantBoundaries)
    .sort((a, b) => a.mid - b.mid)

  return selected
    .map(g => minX + g.mid * binSize)
    .filter(b => {
      const l = items.filter(i => i.x < b).length
      const r = items.filter(i => i.x >= b).length
      return l >= 2 && r >= 2
    })
}

// Detect the column-header row and return midpoint boundaries between header items.
// Works even when headers are letter-spaced ("C O D I G O") by clustering nearby items.
function boundariesFromHeaderRow(items: RawItem[]): number[] {
  const lines = groupLines(items)

  for (const line of lines) {
    const letters = line.map(i => i.text.replace(/[^a-zA-Z]/g, '').toUpperCase()).join('')
    if (!letters.includes('CODIGO')) continue

    // Sort items left-to-right and cluster items that belong to the same column header
    const sorted = [...line].sort((a, b) => a.x - b.x)
    const clusters: { sum: number; count: number }[] = []

    for (const item of sorted) {
      const last = clusters[clusters.length - 1]
      const lastCenter = last ? last.sum / last.count : undefined
      // Items within 20px of current cluster center → same header word
      if (lastCenter !== undefined && item.x - lastCenter < 20) {
        last.sum += item.x
        last.count++
      } else {
        clusters.push({ sum: item.x, count: 1 })
      }
    }

    const centers = clusters.map(c => c.sum / c.count)
    if (centers.length < 2) continue

    return centers.slice(0, -1).map((cx, i) => (cx + centers[i + 1]) / 2)
  }

  return []
}

function buildGenericRows(items: RawItem[], boundaries: number[]): Row[] {
  const numCols = boundaries.length + 1
  const lines = groupLines(items)
  const rows: Row[] = []

  for (const line of lines) {
    const cells = new Array(numCols).fill('')
    let maxFont = 0, anyBold = false
    for (const item of line) {
      const col = assignColumn(item.x, boundaries)
      cells[col] = cells[col] ? cells[col] + ' ' + item.text : item.text
      if (item.fontSize > maxFont) maxFont = item.fontSize
      if (item.bold) anyBold = true
    }

    if (isInternalHeader(cells)) continue

    const isHeading = (maxFont >= 12.5 || anyBold) && cells.filter(c => c).length <= 2
    if (isHeading) {
      const text = cells.filter(c => c).join(' ')
      const padded = [text, ...new Array(numCols - 1).fill('')]
      rows.push({ cells: padded, isHeading: true })
    } else {
      rows.push({ cells, isHeading: false })
    }
  }
  return rows
}

// ── Plain text fallback ──────────────────────────────────────────────────────
function buildTextRows(items: RawItem[]): Row[] {
  return groupLines(items).map(line => {
    const text = line.sort((a, b) => a.x - b.x).map(i => i.text).join(' ').trim()
    const isHeading = line.some(i => i.fontSize >= 12.5 || i.bold)
    return { cells: [text], isHeading }
  })
}
</script>

<style>
.pdf-table {
  border-collapse: collapse;
  font-size: 0.8rem;
  table-layout: auto;
  width: auto;
}
/* Multi-column catalogs (autobuses 7-col) fill the container */
.pdf-table--full { min-width: 100%; }
/* 4-column catalogs (automotor) size to content → N°Original/Año sit close to Detalle */
.pdf-table--compact { min-width: 0; }

.pdf-table thead tr {
  border-bottom: 1px solid rgba(57, 211, 83, 0.25);
}

.pdf-table thead th {
  padding: 0.55rem 0.875rem;
  text-align: left;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #39d353;
  white-space: nowrap;
  background-color: rgba(57, 211, 83, 0.06);
  border-bottom: 1px solid rgba(57, 211, 83, 0.2);
}

/* Column widths: código fixed narrow, detalle flexible, rest shrink to content */
.pdf-table th:nth-child(1), .pdf-table td:nth-child(1) { width: 90px; min-width: 90px; white-space: nowrap; }
.pdf-table th:nth-child(2), .pdf-table td:nth-child(2) { width: auto; }
.pdf-table th:nth-child(n+3), .pdf-table td:nth-child(n+3) { width: 1%; white-space: nowrap; }

.pdf-row-data {
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.pdf-row-data:nth-child(even) { background-color: rgba(255, 255, 255, 0.018); }
.pdf-row-data:hover { background-color: rgba(255, 255, 255, 0.04); }
.pdf-row-data td {
  padding: 0.38rem 0.875rem;
  vertical-align: middle;
  line-height: 1.35;
}

.pdf-cell-code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.78rem !important;
  color: rgba(245, 245, 245, 0.92) !important;
  white-space: nowrap;
  font-weight: 600;
}
.pdf-cell-detail { color: rgba(245, 245, 245, 0.7) !important; }
.pdf-cell-nr {
  color: rgba(245, 245, 245, 0.6) !important;
  font-size: 0.76rem !important;
  font-family: 'Courier New', Courier, monospace;
}
.pdf-cell-year {
  color: rgba(245, 245, 245, 0.38) !important;
  font-size: 0.74rem !important;
}
.pdf-cell-spec {
  color: rgba(245, 245, 245, 0.55) !important;
  font-size: 0.75rem !important;
  text-align: right;
}

.pdf-row-heading td {
  padding: 0.6rem 0.875rem 0.35rem;
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-top: 1px solid rgba(57, 211, 83, 0.15);
  background-color: rgba(57, 211, 83, 0.04);
}

.pdf-search-input {
  width: 100%;
  background-color: #1a1a1a;
  border: 1px solid #2a2a2a;
  color: #f5f5f5;
  padding: 0.6rem 2.25rem;
  font-size: 0.875rem;
  font-family: 'Inter', ui-sans-serif, sans-serif;
  transition: border-color 0.3s ease;
  outline: none;
}
.pdf-search-input::placeholder { color: #555; }
.pdf-search-input:focus { border-color: rgba(57, 211, 83, 0.4); }

.pdf-highlight {
  background-color: #39d353;
  color: #0a0a0a;
  border-radius: 2px;
  padding: 0 2px;
  font-weight: 700;
}
</style>
