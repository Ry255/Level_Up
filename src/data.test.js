import { productos, regiones } from './data'

describe('data.js - productos', () => {
  it('es un arreglo con al menos un producto', () => {
    expect(Array.isArray(productos)).toBe(true)
    expect(productos.length).toBeGreaterThan(0)
  })

  it('cada producto tiene la estructura correcta', () => {
    productos.forEach((p) => {
      expect(typeof p.codigo).toBe('string')
      expect(typeof p.nombre).toBe('string')
      expect(typeof p.precio).toBe('number')
      expect(p.precio).toBeGreaterThan(0)
      expect(typeof p.categoria).toBe('string')
      expect(typeof p.descripcion).toBe('string')
      expect(p.img).toMatch(/^https?:\/\//)
    })
  })

  it('los códigos de producto son únicos', () => {
    const codigos = productos.map((p) => p.codigo)
    expect(new Set(codigos).size).toBe(codigos.length)
  })
})

describe('data.js - regiones', () => {
  it('cada región tiene nombre y una lista de comunas', () => {
    expect(regiones.length).toBeGreaterThan(0)
    regiones.forEach((r) => {
      expect(typeof r.nombre).toBe('string')
      expect(Array.isArray(r.comunas)).toBe(true)
      expect(r.comunas.length).toBeGreaterThan(0)
    })
  })
})