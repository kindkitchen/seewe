import { describe, expect, it } from "vitest"
import { url_param_replacer } from "./url_param_replacer.util"

describe("url-params-replacer.between_curly", () => {
  it("should replace url params", () => {
    const url = "https://api.com/{id}"
    const params = { id: "1" }
    const result = url_param_replacer.between_curly(url, params)
    expect(result).toBe("https://api.com/1")
  })

  it("should work with multiple params", () => {
    const url = "https://api.com/{id}/{name}"
    const params = { id: "1", name: "john" }
    const result = url_param_replacer.between_curly(url, params)
    expect(result).toBe("https://api.com/1/john")
  })
})

describe("url-params-replacer.after_colon", () => {
  it("should replace url params", () => {
    const url = "https://api.com/:id"
    const params = { id: "1" }
    const result = url_param_replacer.after_colon(url, params)
    expect(result).toBe("https://api.com/1")
  })

  it("should work with multiple params", () => {
    const url = "https://api.com/:id/:name"
    const params = { id: "1", name: "john" }
    const result = url_param_replacer.after_colon(url, params)
    expect(result).toBe("https://api.com/1/john")
  })
})
