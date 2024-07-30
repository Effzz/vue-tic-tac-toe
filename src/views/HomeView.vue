<template>
    <div class="text-center mt-0 mx-auto">
        <h1 class="text-3xl font-bold">Zeals.asia - Tic Tac Toe</h1>
        <BoardPanel />
        <div v-if="winner" class="mt-4 text-2xl">Winner: {{ winner }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BoardPanel from '../components/BoardPanel.vue'
import { useTicTacToeStore } from '../stores/games'

export default defineComponent({
    components: {
        BoardPanel
    },
    setup() {
        const gameStore = useTicTacToeStore()
        return {
            winner: gameStore.winner
        }
    }
})
</script>
