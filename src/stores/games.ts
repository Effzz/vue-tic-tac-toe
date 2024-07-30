import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'tictactoe-store'

export const useTicTacToeStore = defineStore('tictactoe', () => {
    const storageValue = localStorage.getItem(STORAGE_KEY) || '[]'
    const board = ref<any>(storageValue !== '[]' ? JSON.parse(storageValue) : Array(9).fill(null))
    const currentPlayer = ref<string>(localStorage.getItem(`${STORAGE_KEY}-currentPlayer`) || 'X')
    const winner = ref<string | null>(null)

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern
            if (
                board.value[a] &&
                board.value[a] === board.value[b] &&
                board.value[a] === board.value[c]
            ) {
                winner.value = board.value[a]
                return
            }
        }
        if (!board.value.includes(null)) {
            winner.value = 'Draw'
        }
    }

    const makeMove = (index: number) => {
        if (!winner.value && !board.value[index]) {
            board.value[index] = currentPlayer.value
            currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
        }
        checkWinner()
    }

    const resetGame = () => {
        board.value = Array(9).fill(null)
        currentPlayer.value = 'X'
        winner.value = null
    }

    watch(
        board,
        (newBoard) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newBoard))
        },
        { deep: true }
    )

    watch(currentPlayer, (newPlayer) => {
        localStorage.setItem(`${STORAGE_KEY}-currentPlayer`, newPlayer)
    })

    return {
        board,
        currentPlayer,
        winner,
        makeMove,
        resetGame,
        gameOver: computed(() => winner.value !== null)
    }
})
