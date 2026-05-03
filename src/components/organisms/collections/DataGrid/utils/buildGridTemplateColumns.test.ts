import { ColDef } from './types'
import { buildGridTemplateColumns } from './utils'

const col = (overrides: Partial<ColDef> = {}): ColDef => ({
  name: 'x',
  label: 'X',
  ...overrides,
})

describe('buildGridTemplateColumns', () => {
  describe('default mode (fit=false)', () => {
    it('shrink without width → auto', () => {
      expect(buildGridTemplateColumns([col({ shrink: true })])).toBe('auto')
    })

    it('shrink with width → minmax(0, width)', () => {
      expect(buildGridTemplateColumns([col({ shrink: true, width: '120px' })])).toBe(
        'minmax(0, 120px)',
      )
    })

    it('grow:true without width → 1fr (min-content blocks shrink)', () => {
      expect(buildGridTemplateColumns([col({ grow: true })])).toBe('1fr')
    })

    it('grow:number without width → Xfr', () => {
      expect(buildGridTemplateColumns([col({ grow: 2 })])).toBe('2fr')
    })

    it('grow:true with width → minmax(width, 1fr)', () => {
      expect(buildGridTemplateColumns([col({ grow: true, width: '150px' })])).toBe(
        'minmax(150px, 1fr)',
      )
    })

    it('width only → fixed width', () => {
      expect(buildGridTemplateColumns([col({ width: '200px' })])).toBe('200px')
    })

    it('no width, no grow, no shrink → 1fr', () => {
      expect(buildGridTemplateColumns([col()])).toBe('1fr')
    })

    it('joins multiple columns with spaces', () => {
      expect(
        buildGridTemplateColumns([
          col({ width: '100px' }),
          col({ grow: true }),
          col({ shrink: true }),
        ]),
      ).toBe('100px 1fr auto')
    })
  })

  describe('fit mode (fit=true)', () => {
    it('grow:true without width → minmax(0, 1fr) so cells can truncate', () => {
      expect(buildGridTemplateColumns([col({ grow: true })], true)).toBe('minmax(0, 1fr)')
    })

    it('grow:number without width → minmax(0, Xfr)', () => {
      expect(buildGridTemplateColumns([col({ grow: 3 })], true)).toBe('minmax(0, 3fr)')
    })

    it('no width, no grow, no shrink → minmax(0, 1fr)', () => {
      expect(buildGridTemplateColumns([col()], true)).toBe('minmax(0, 1fr)')
    })

    it('grow:true with width → minmax(0, 1fr) (width ignored, fr fills)', () => {
      expect(buildGridTemplateColumns([col({ grow: true, width: '150px' })], true)).toBe(
        'minmax(0, 1fr)',
      )
    })

    it('grow:number with width → minmax(0, Xfr) (width ignored, fr fills)', () => {
      expect(buildGridTemplateColumns([col({ grow: 2, width: '150px' })], true)).toBe(
        'minmax(0, 2fr)',
      )
    })

    it('shrink unchanged', () => {
      expect(buildGridTemplateColumns([col({ shrink: true })], true)).toBe('auto')
      expect(buildGridTemplateColumns([col({ shrink: true, width: '80px' })], true)).toBe(
        'minmax(0, 80px)',
      )
    })

    it('fixed width only → minmax(0, width) (width becomes max, shrinks below)', () => {
      expect(buildGridTemplateColumns([col({ width: '200px' })], true)).toBe('minmax(0, 200px)')
    })
  })
})
