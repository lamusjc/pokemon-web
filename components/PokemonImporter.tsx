'use client'

import React, { useState, useEffect, useCallback } from 'react'
import PokemonCard from './PokemonCard'
import { Card, CardContent } from './ui/card'
import Button from './ui/button'
import Progress from './ui/progress'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { config } from '@/lib/config'
import { useWebSocket } from '@/app/hooks/useWebSocket'

interface Pokemon {
  id: number
  name: string
  weight: number
  image_url: string
  types: { id: number; name: string }[]
  abilities: { id: number; name: string; effect: string }[]
}

const PokemonImporter: React.FC = () => {
  const [status, setStatus] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [showPokemons, setShowPokemons] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pokemonsPerPage = 20

  const socket = useWebSocket('/ws/pokemon/')

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log('WebSocket connection established')
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setMessage(data.message)
        if (data.message.includes('completada')) {
          setIsLoading(false)
          setStatus('completed')
          setProgress(100)
        } else if (data.message.includes('Iniciando')) {
          setStatus('started')
          setIsLoading(true)
          setProgress(0)
        } else if (data.message.includes('Procesando')) {
          const match = data.message.match(/Procesando Pokemon (\d+) de (\d+)/)
          if (match) {
            const [current, total] = match.slice(1).map(Number)
            setProgress((current / total) * 100)
          }
        }
      }

      socket.onclose = (event) => {
        console.log('WebSocket connection closed', event.reason)
        setMessage('Conexion WebSocket cerrada. Reconectando...')
      }

      socket.onerror = (error) => {
        console.error('WebSocket error:', error)
        setMessage('Error en la conexion WebSocket')
      }
    }
  }, [socket])

  const fetchPokemons = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${config.apiUrl}/api/pokemons/`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setPokemons(data)
      setShowPokemons(true)
    } catch (error) {
      console.error('Error fetching Pokemons:', error)
      setMessage(`Error fetching Pokemons: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (status === 'completed') {
      fetchPokemons();
    }
  }, [status, fetchPokemons]);

  const startImport = async () => {
    try {
      setIsLoading(true)
      setStatus('starting')
      setMessage('Iniciando importacion...')
      setProgress(0)
      const response = await fetch(`${config.apiUrl}/api/import-pokemon/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
      setMessage('Importacion iniciada exitosamente')
    } catch (error) {
      console.error('Error al iniciar la importacion:', error)
      setIsLoading(false)
      setStatus('error')
      setMessage(`Error al iniciar la importacion: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const indexOfLastPokemon = currentPage * pokemonsPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <Card className="w-full max-w-4xl mx-auto">

      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Importar pokemon</h2>
        <Button
          onClick={startImport}
          className="w-full mb-4"
          disabled={isLoading}
        >
          {isLoading ? 'Importando...' : 'Iniciar Importacion'}
        </Button>
        {isLoading && (
          <Progress value={progress} className="w-full mb-4" />
        )}
        {status && (
          <Alert variant={status === 'error' ? 'error' : 'info'} className="mt-4">
            <AlertTitle>Estado: {status}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        {status === 'completed' && (
          <Alert variant="success" className="mt-4">
            <AlertTitle>Importacion Completada</AlertTitle>
            <AlertDescription>Los Pokemon han sido cargados</AlertDescription>
          </Alert>
        )}
        {showPokemons && (
          <>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentPokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              {Array.from({ length: Math.ceil(pokemons.length / pokemonsPerPage) }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  variant={currentPage === i + 1 ? 'primary' : 'secondary'}
                  className="mx-1"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default PokemonImporter