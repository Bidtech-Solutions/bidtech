<script setup lang="ts">
import { Check, ChevronDown } from '@lucide/vue';

export interface DropdownOption {
  value: string | number;
  label: string;
  badge?: string;
  desc?: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    options: DropdownOption[];
    prefixText?: string;
    placeholder?: string;
    buttonClass?: string;
    dropdownClass?: string;
    align?: 'left' | 'right';
  }>(),
  {
    prefixText: '',
    placeholder: 'Pilih...',
    buttonClass: '',
    dropdownClass: '',
    align: 'right',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const currentOption = computed(() =>
  props.options.find((o) => o.value === props.modelValue)
);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};

const select = (val: string | number) => {
  emit('update:modelValue', val);
  close();
};

onMounted(() => {
  const handler = (e: MouseEvent) => {
    if (!containerRef.value) return;
    if (!containerRef.value.contains(e.target as Node)) {
      close();
    }
  };
  document.addEventListener('click', handler);
  onUnmounted(() => document.removeEventListener('click', handler));
});
</script>

<template>
  <div
    ref="containerRef"
    :class="['relative inline-block', isOpen ? 'z-50' : 'z-10']"
    @keydown.esc="close"
  >
    <!-- Trigger Button -->
    <button
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :class="[
        'h-9 px-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-2 cursor-pointer text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-[#0047AB]',
        isOpen
          ? 'border-[#0047AB] bg-blue-50 text-[#0047AB] shadow-sm dark:bg-slate-800 dark:border-sky-400 dark:text-sky-400'
          : 'border-slate-200 bg-white hover:border-[#0047AB]/50 hover:bg-slate-50 text-slate-800 shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-100',
        buttonClass
      ]"
      @click.stop="toggle"
    >
      <div class="flex items-center gap-1.5 truncate">
        <slot name="icon" />
        <span v-if="prefixText" class="text-slate-400 font-medium shrink-0 dark:text-slate-400">{{ prefixText }}</span>
        <span class="truncate">{{ currentOption ? currentOption.label : placeholder }}</span>
      </div>
      <ChevronDown
        aria-hidden="true"
        :class="['h-3.5 w-3.5 shrink-0 transition-transform duration-200 text-[#0047AB] dark:text-sky-400', isOpen && 'rotate-180']"
      />
    </button>

    <!-- Floating Dropdown Card (Matches user reference image) -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-1"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen"
        :class="[
          'absolute mt-2 z-50 rounded-2xl bg-white border border-slate-200/90 shadow-xl p-1.5 space-y-1 dark:bg-slate-900 dark:border-slate-800 min-w-[200px]',
          align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
          dropdownClass
        ]"
        role="listbox"
      >
        <button
          v-for="opt in options"
          :key="opt.value"
          type="button"
          role="option"
          :aria-selected="modelValue === opt.value"
          :class="[
            'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer text-left',
            modelValue === opt.value
              ? 'bg-[#0047AB] text-white font-extrabold shadow-xs dark:bg-[#0047AB] dark:text-white'
              : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 font-semibold dark:text-slate-200 dark:hover:bg-slate-800'
          ]"
          @click="select(opt.value)"
        >
          <div class="flex items-center gap-2 truncate">
            <span
              v-if="opt.badge"
              :class="[
                'w-6 h-5 rounded-md flex items-center justify-center text-[10px] font-black uppercase shrink-0',
                modelValue === opt.value
                  ? 'bg-white text-[#0047AB]'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
              ]"
            >
              {{ opt.badge }}
            </span>
            <div class="flex flex-col truncate">
              <span class="truncate leading-tight">{{ opt.label }}</span>
              <span
                v-if="opt.desc"
                :class="[
                  'text-[10px] leading-tight mt-0.5 truncate',
                  modelValue === opt.value ? 'text-white/80' : 'text-slate-400 dark:text-slate-400'
                ]"
              >
                {{ opt.desc }}
              </span>
            </div>
          </div>
          <Check v-if="modelValue === opt.value" aria-hidden="true" class="h-4 w-4 shrink-0 text-white stroke-[2.5] ml-2" />
        </button>
      </div>
    </Transition>
  </div>
</template>
