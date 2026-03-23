"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { Copy, Check, Moon, Sun, Globe } from "lucide-react"

type QuoteType = "single" | "double"
type SeparatorType = "space" | "newline"
type Language = "en" | "pt"

const translations = {
  en: {
    title: "SQL Quote Formatter",
    subtitle: "Format your IDs for SQL IN clauses",
    inputLabel: "Input",
    inputPlaceholder:
      "Paste your IDs here...\nSupports line breaks or comma-separated values",
    outputLabel: "Output",
    outputPlaceholder: "Your formatted output will appear here...",
    quoteType: "Quote Type",
    separatorType: "Separator",
    singleQuotes: "Single Quotes",
    doubleQuotes: "Double Quotes",
    spaceSeparator: "Space",
    newlineSeparator: "Line Break",
    format: "Format",
    clear: "Clear",
    copy: "Copy",
    copied: "Copied!",
    itemsCount: "items formatted",
    example: "Example Input",
    exampleText: "Line-separated or comma-separated IDs",
    howToUse: "How to use",
    step1: "Paste your IDs (one per line or comma-separated)",
    step2: "Choose between single or double quotes",
    step3: "Choose whether the output should use spaces or line breaks",
    step4: "Click Format to generate SQL IN clause format",
    step5: "Copy the output and use in your SQL queries",
    footerText: "Built for developers who work with SQL queries",
  },
  pt: {
    title: "Formatador SQL de Aspas",
    subtitle: "Formate seus IDs para cláusulas SQL IN",
    inputLabel: "Entrada",
    inputPlaceholder:
      "Cole seus IDs aqui...\nSuporta quebras de linha ou valores separados por vírgula",
    outputLabel: "Saída",
    outputPlaceholder: "Sua saída formatada aparecerá aqui...",
    quoteType: "Tipo de Aspas",
    separatorType: "Separador",
    singleQuotes: "Aspas Simples",
    doubleQuotes: "Aspas Duplas",
    spaceSeparator: "Espaço",
    newlineSeparator: "Quebra de Linha",
    format: "Formatar",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado!",
    itemsCount: "itens formatados",
    example: "Exemplo de Entrada",
    exampleText: "IDs separados por linha ou vírgula",
    howToUse: "Como usar",
    step1: "Cole seus IDs (um por linha ou separados por vírgula)",
    step2: "Escolha entre aspas simples ou duplas",
    step3: "Escolha se a saída deve usar espaços ou quebras de linha",
    step4: "Clique em Formatar para gerar formato de cláusula SQL IN",
    step5: "Copie a saída e use em suas consultas SQL",
    footerText: "Criado para desenvolvedores que trabalham com consultas SQL",
  },
}

export default function StringFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [quoteType, setQuoteType] = useState<QuoteType>("single")
  const [separatorType, setSeparatorType] =
    useState<SeparatorType>("newline")
  const [copied, setCopied] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [language, setLanguage] = useState<Language>("en")
  const [itemCount, setItemCount] = useState(0)

  const t = translations[language]

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const savedLanguage = localStorage.getItem("language") as Language | null

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }

    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "pt" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const formatStrings = () => {
    if (!input.trim()) {
      setOutput("")
      setItemCount(0)
      return
    }

    // Split by newlines first, then by commas, and filter out empty strings.
    const items = input
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)

    const quote = quoteType === "single" ? "'" : '"'
    const itemSeparator = separatorType === "space" ? ", " : ",\n"
    const formatted = items
      .map((item) => `${quote}${item}${quote}`)
      .join(itemSeparator)

    setOutput(formatted)
    setItemCount(items.length)
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
    setItemCount(0)
    setCopied(false)
  }

  const copyToClipboard = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                title={
                  language === "en"
                    ? "Switch to Portuguese"
                    : "Mudar para Inglês"
                }
              >
                <Globe className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                title={theme === "light" ? "Dark Mode" : "Light Mode"}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Controls */}
          <Card className="mb-6 p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end">
              <div className="flex-1">
                <Label className="mb-3 block text-sm font-medium">
                  {t.quoteType}
                </Label>
                <RadioGroup
                  value={quoteType}
                  onValueChange={(value) => setQuoteType(value as QuoteType)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label
                      htmlFor="single"
                      className="cursor-pointer font-normal"
                    >
                      {t.singleQuotes} (<span className="font-mono">'</span>)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="double" id="double" />
                    <Label
                      htmlFor="double"
                      className="cursor-pointer font-normal"
                    >
                      {t.doubleQuotes} (<span className="font-mono">"</span>)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex-1">
                <Label className="mb-3 block text-sm font-medium">
                  {t.separatorType}
                </Label>
                <RadioGroup
                  value={separatorType}
                  onValueChange={(value) =>
                    setSeparatorType(value as SeparatorType)
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="space" id="space" />
                    <Label htmlFor="space" className="cursor-pointer font-normal">
                      {t.spaceSeparator}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="newline" id="newline" />
                    <Label
                      htmlFor="newline"
                      className="cursor-pointer font-normal"
                    >
                      {t.newlineSeparator}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={formatStrings}
                  size="lg"
                  className="min-w-[120px]"
                >
                  {t.format}
                </Button>
                <Button onClick={clearAll} variant="outline" size="lg">
                  {t.clear}
                </Button>
              </div>
            </div>
          </Card>

          {/* Input/Output Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Input */}
            <Card className="p-6">
              <Label htmlFor="input" className="mb-2 block text-sm font-medium">
                {t.inputLabel}
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.inputPlaceholder}
                className="min-h-[400px] resize-none font-mono text-sm"
              />
              <div className="mt-3 text-xs text-muted-foreground">
                <p className="mb-1 font-semibold">{t.example}:</p>
                <code className="block rounded bg-muted p-2">
                  589c16c8-cec0-4fc5-b936-9edaff07e923
                  <br />
                  589c16c8-cec0-4fc5-b936-9edaff07e924
                  <br />
                  {language === "pt" ? "ou" : "or"}: id1,id2,id3
                </code>
              </div>
            </Card>

            {/* Output */}
            <Card className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <Label htmlFor="output" className="text-sm font-medium">
                  {t.outputLabel}
                </Label>
                {output && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        {t.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        {t.copy}
                      </>
                    )}
                  </Button>
                )}
              </div>
              <Textarea
                id="output"
                value={output}
                readOnly
                placeholder={t.outputPlaceholder}
                className="min-h-[400px] resize-none bg-muted/50 font-mono text-sm"
              />
              {itemCount > 0 && (
                <div className="mt-3 text-xs text-muted-foreground">
                  <span className="font-semibold">{itemCount}</span>{" "}
                  {t.itemsCount}
                </div>
              )}
            </Card>
          </div>

          {/* Usage Info */}
          <Card className="mt-6 bg-muted/50 p-6">
            <h3 className="mb-2 text-sm font-semibold">{t.howToUse}:</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>{t.step1}</li>
              <li>{t.step2}</li>
              <li>{t.step3}</li>
              <li>{t.step4}</li>
              <li>{t.step5}</li>
            </ul>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          {t.footerText}
        </div>
      </footer>
    </div>
  )
}
