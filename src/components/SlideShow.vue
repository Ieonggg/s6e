<template>
    <component :is="DutiesPanel"></component>
</template>

<script>
import DutiesPanel from './SlideShowParts/DutiesPanel.vue';

export default {
    name: 'SlideShow',
    components: {
        DutiesPanel,
    },
    data() {
        return {
            currentPanel: 'DutiesPanel'
        }
    }
}
</script>

<style>

</style>