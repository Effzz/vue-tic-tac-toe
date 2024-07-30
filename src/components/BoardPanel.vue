<template>
    <div class="flex flex-col items-center min-h-screen bg-gray-100 p-6 mt-6">
        <p v-if="!gameOver" class="text-xl mb-4">{{ currentPlayer }}'s turn to choose</p>
        <div class="grid grid-cols-3 gap-2">
            <div
                v-for="(cell, index) in board"
                :key="index"
                class="w-24 h-24 flex items-center justify-center bg-gray-200 text-2xl cursor-pointer"
                @click="makeMove(index)"
            >
                {{ cell }}
            </div>
        </div>

        <button
            v-if="!gameOver && !isBoardEmpty"
            @click="resetGame"
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
            Reset Game
        </button>

        <!-- Winner Modal -->
        <div
            v-if="gameOver"
            class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
        >
            <div class="bg-white p-8 rounded shadow-lg text-center">
                <p v-if="winner === 'Draw'" class="text-xl font-bold mb-4">It's a Draw!</p>
                <p v-else class="text-xl font-bold mb-4">{{ winner }} Wins!</p>
                <button @click="resetGame" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Restart Game
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useTicTacToeStore } from '../stores/games'

export default defineComponent({
    setup() {
        const store = useTicTacToeStore()
        const { board, currentPlayer, winner, gameOver } = storeToRefs(store)

        const isBoardEmpty = computed(() => {
            return board.value.every((cell: string) => cell === null)
        })

        return {
            board,
            currentPlayer,
            winner,
            gameOver,
            isBoardEmpty,
            makeMove: store.makeMove,
            resetGame: store.resetGame
        }
    }
})
</script>
