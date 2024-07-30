import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTicTacToeStore = defineStore('tictactoe', () => {
    const board = ref<Array<string | null>>([null, null, null, null, null, null, null, null, null])
    const currentPlayer = ref<'X' | 'O'>('X')
    const gameOver = ref(false)
    const winner = ref<string | null>(null)
    const successMessage = ref<string | null>(null)
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const saveGame = (slot: string) => {
        localStorage.setItem(
            `tic-tac-toe-save-${slot}`,
            JSON.stringify({
                board: board.value,
                currentPlayer: currentPlayer.value,
                gameOver: gameOver.value,
                winner: winner.value
            })
        )

        successMessage.value = `Game saved`
        setTimeout(() => (successMessage.value = null), 2000)
    }

    const loadGame = (slot: string) => {
        const savedGame = localStorage.getItem(`tic-tac-toe-save-${slot}`)
        if (savedGame) {
            const {
                board: savedBoard,
                currentPlayer: savedPlayer,
                gameOver: savedGameOver,
                winner: savedWinner
            } = JSON.parse(savedGame)
            board.value = savedBoard
            currentPlayer.value = savedPlayer
            gameOver.value = savedGameOver
            winner.value = savedWinner
            successMessage.value = `Game loaded`
            setTimeout(() => (successMessage.value = null), 2000)
        } else {
            successMessage.value = `No saved game found`
            setTimeout(() => (successMessage.value = null), 2000)
        }
    }

    const resetGame = () => {
        board.value = [null, null, null, null, null, null, null, null, null]
        currentPlayer.value = 'X'
        gameOver.value = false
        winner.value = null
    }

    const makeMove = (index: number) => {
        if (board.value[index] || gameOver.value) return

        board.value[index] = currentPlayer.value
        checkWinner()
        if (!gameOver.value) {
            currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
        }
    }

    const checkWinner = () => {
        for (const [a, b, c] of winningCombinations) {
            if (
                board.value[a] &&
                board.value[a] === board.value[b] &&
                board.value[a] === board.value[c]
            ) {
                winner.value = board.value[a]
                gameOver.value = true
                return
            }
        }

        if (board.value.every((cell) => cell !== null)) {
            winner.value = 'Draw'
            gameOver.value = true
        }
    }

    return {
        board,
        currentPlayer,
        gameOver,
        successMessage,
        winner,
        saveGame,
        loadGame,
        resetGame,
        makeMove
    }
})
