import React from 'react'
import { Card, CardContent } from './ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

interface Ability {
  id: number
  name: string
  effect: string
}

interface Pokemon {
  id: number
  name: string
  weight: number
  image_url: string
  types: { id: number; name: string }[]
  abilities: Ability[]
}

interface PokemonCardProps {
  pokemon: Pokemon
}

const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="relative w-full h-32 mb-2">
          <img
            src={pokemon.image_url}
            alt={pokemon.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <h3 className="text-lg font-semibold capitalize text-foreground">{pokemon.name}</h3>
        <p className="text-sm text-muted-foreground">Peso: {pokemon.weight / 10} kg</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {pokemon.types.map((type) => (
            <span
              key={type.id}
              className={`px-2 py-1 rounded-full text-xs capitalize text-white ${typeColors[type.name] || 'bg-gray-400'}`}
            >
              {type.name}
            </span>
          ))}
        </div>
        <div className="mt-2">
          <h4 className="font-semibold text-foreground">Habilidades:</h4>
          <Accordion type="single" collapsible>
            {pokemon.abilities.map((ability) => (
              <AccordionItem key={ability.id} value={ability.id.toString()}>
                <AccordionTrigger>{ability.name}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-xs text-muted-foreground">{ability.effect}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}

export default PokemonCard

