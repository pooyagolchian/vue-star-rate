import { IconSize, StarRateProps } from '../types';

declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<StarRateProps>, {
    modelValue: number;
    maxStars: number;
    allowHalf: boolean;
    readonly: boolean;
    disabled: boolean;
    showCounter: boolean;
    counterTemplate: string;
    iconProvider: string;
    iconSize: undefined;
    gap: number;
    showTooltip: boolean;
    allowReset: boolean;
    minRating: number;
    step: number;
    rtl: boolean;
    clearable: boolean;
    inline: boolean;
    size: string;
    ariaLabel: string;
}>>, {
    reset: () => void;
    setRating: (value: number) => void;
    getRating: () => number;
    focus: () => void;
    blur: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: number) => void;
    change: (value: number, previousValue: number) => void;
    hover: (value: number | null) => void;
    focus: () => void;
    blur: () => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<StarRateProps>, {
    modelValue: number;
    maxStars: number;
    allowHalf: boolean;
    readonly: boolean;
    disabled: boolean;
    showCounter: boolean;
    counterTemplate: string;
    iconProvider: string;
    iconSize: undefined;
    gap: number;
    showTooltip: boolean;
    allowReset: boolean;
    minRating: number;
    step: number;
    rtl: boolean;
    clearable: boolean;
    inline: boolean;
    size: string;
    ariaLabel: string;
}>>> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    onChange?: ((value: number, previousValue: number) => any) | undefined;
    onHover?: ((value: number | null) => any) | undefined;
    onFocus?: (() => any) | undefined;
    onBlur?: (() => any) | undefined;
}>, {
    modelValue: number;
    maxStars: number;
    allowHalf: boolean;
    readonly: boolean;
    disabled: boolean;
    allowReset: boolean;
    minRating: number;
    step: number;
    size: "xs" | "sm" | "md" | "lg" | "xl";
    inline: boolean;
    iconSize: number | IconSize;
    showCounter: boolean;
    counterTemplate: string;
    iconProvider: import('../types').IconProvider;
    gap: number;
    showTooltip: boolean;
    rtl: boolean;
    clearable: boolean;
    ariaLabel: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>, {
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
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
