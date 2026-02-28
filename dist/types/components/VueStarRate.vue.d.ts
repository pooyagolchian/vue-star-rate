import { IconSize, RatingValue, StarRateProps } from '../types';
type __VLS_Props = StarRateProps;
type __VLS_PublicProps = {
    modelValue?: number;
} & __VLS_Props;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        icon?(_: {
            filled: boolean;
            half: boolean;
            size: IconSize;
            color: string;
            index: number;
        }): any;
        counter?(_: {
            value: number;
            max: number;
        }): any;
        clear?(_: {}): any;
    };
    refs: {
        container: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_PublicProps, {
    reset: () => void;
    setRating: (value: RatingValue) => void;
    getRating: () => RatingValue;
    focus: () => void;
    blur: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: number) => any;
    change: (value: number, previousValue: number) => any;
    hover: (value: number | null) => any;
    focus: () => any;
    blur: () => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    onChange?: ((value: number, previousValue: number) => any) | undefined;
    onHover?: ((value: number | null) => any) | undefined;
    onFocus?: (() => any) | undefined;
    onBlur?: (() => any) | undefined;
}>, {
    size: "xs" | "sm" | "md" | "lg" | "xl";
    iconSize: number | IconSize;
    inline: boolean;
    maxStars: number;
    allowHalf: boolean;
    readonly: boolean;
    disabled: boolean;
    showCounter: boolean;
    counterTemplate: string;
    iconProvider: import('..').IconProvider;
    gap: number;
    showTooltip: boolean;
    allowReset: boolean;
    minRating: number;
    step: number;
    rtl: boolean;
    clearable: boolean;
    ariaLabel: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    container: HTMLDivElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
