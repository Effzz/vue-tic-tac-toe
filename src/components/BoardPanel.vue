<template>
    <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4 mt-4">
        <p class="text-xl mb-4">
            <strong>{{ currentPlayer }}'s</strong> turn to choose
        </p>
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
        <div class="mt-4">
            <button
                v-if="!gameOver && !isBoardEmpty"
                @click="resetGame"
                class="px-4 py-2 bg-red-500 text-white rounded"
            >
                Reset Game
            </button>
            <button
                v-if="!gameOver && !isBoardEmpty"
                @click="saveGame('slot1')"
                class="ml-2 px-4 py-2 bg-green-500 text-white rounded"
            >
                Save Game
            </button>
            <button
                v-if="!gameOver && isBoardEmpty"
                @click="loadGame('slot1')"
                class="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Load Game
            </button>
        </div>

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
        <!-- Success Modal -->
        <div
            v-if="successMessage"
            class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
        >
            <div class="bg-white p-8 rounded shadow-lg text-center">
                <p class="text-xl font-bold">{{ successMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useTicTacToeStore } from '../stores/games'
import { storeToRefs } from 'pinia'

export default defineComponent({
    setup() {
        const store = useTicTacToeStore()
        const { board, currentPlayer, winner, gameOver, successMessage } = storeToRefs(store)

        const isBoardEmpty = computed(() => board.value.every((cell) => cell === null))

        return {
            board,
            currentPlayer,
            winner,
            gameOver,
            isBoardEmpty,
            successMessage,
            makeMove: store.makeMove,
            resetGame: store.resetGame,
            saveGame: (slot: string) => store.saveGame(slot),
            loadGame: (slot: string) => store.loadGame(slot)
        }
    }
})
</script>
