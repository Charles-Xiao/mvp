import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function CalculatorComponent() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("0")

  const handleInput = (val: string) => {
    if (val === "=") {
      try {
        const res = eval(input)
        setResult(res.toString())
        setInput("")
      } catch (e) {
        setResult("Error")
      }
    } else if (val === "C") {
      setInput("")
      setResult("0")
    } else if (val === "⌫") {
      if (input === "") {
        return
      } else if (input.length === 1) {
        setResult("0")
        setInput("")
      } else {
        setResult(input.slice(0, -1))
        setInput(input.slice(0, -1))
      }
    } else {
      setInput(input + val)
      setResult(input + val)
    }
  }

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden max-w-sm w-full">
        <div className="text-right text-4xl p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">{result}</div>
        <div className="grid grid-cols-4 gap-1 p-4 bg-gray-100 dark:bg-gray-800">
          <Button className="col-span-2 bg-red-500 text-white" onClick={() => handleInput("C")}>C</Button>
          <Button className="bg-yellow-500 text-black" onClick={() => handleInput("⌫")}>⌫</Button>
          <Button className="bg-yellow-500 text-black" onClick={() => handleInput("/")}>/</Button>
          <Button onClick={() => handleInput("7")}>7</Button>
          <Button onClick={() => handleInput("8")}>8</Button>
          <Button onClick={() => handleInput("9")}>9</Button>
          <Button className="bg-yellow-500 text-black" onClick={() => handleInput("*")}>*</Button>
          <Button onClick={() => handleInput("4")}>4</Button>
          <Button onClick={() => handleInput("5")}>5</Button>
          <Button onClick={() => handleInput("6")}>6</Button>
          <Button className="bg-yellow-500 text-black" onClick={() => handleInput("-")}>-</Button>
          <Button onClick={() => handleInput("1")}>1</Button>
          <Button onClick={() => handleInput("2")}>2</Button>
          <Button onClick={() => handleInput("3")}>3</Button>
          <Button className="bg-yellow-500 text-black" onClick={() => handleInput("+")}>+</Button>
          <Button className="col-span-2" onClick={() => handleInput("0")}>0</Button>
          <Button onClick={() => handleInput(".")}>.</Button>
          <Button className="bg-green-500 text-white" onClick={() => handleInput("=")}>=</Button>
        </div>
      </div>
    // </div>
  )
}


