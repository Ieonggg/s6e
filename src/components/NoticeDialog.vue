<template>
    <Dialog as="div">
        <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-14 text-center">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="fixed inset-0" />
        </TransitionChild>

        <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
          <div class=" inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
            <DialogTitle as="h3" class="text-lg font-medium text-center leading-6 text-black">提示</DialogTitle>
            <div class="mt-2">
              <p class="text-sm text-center text-black">{{ DialogMessage }}</p>
            </div>

            <div class="mt-4 flex items-center justify-evenly">
              <slot></slot>
            </div>
        </div>
    </TransitionChild>
        </div>
    </div>
    </Dialog>
</template>

<script>
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle,} from "@headlessui/vue";

export default {
    name: 'NoticeDialog',
    components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    },
    props: ['DialogMessage']
}
</script>

<style>

</style>