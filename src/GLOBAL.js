const apiPort = window.env.API_PORT || window.location.port;

const apiLocation = `${window.env.API_PROTOCOL || window.location.protocol}//${
    window.env.API_HOST || window.location.hostname
}${apiPort ? ":" + apiPort : ""}`;
const loadStatuses = { initial: "initial", loading: "loading", error: "error", loaded: "loaded" };

const operations = {
    eq: { label: "==", values: ["=", "==", "eq"], is_binary: true, convert_non_factor: true, meta: "eq" },
    gt: { values: [">", "gt"], is_binary: true, convert_non_factor: true, meta: "eq" },
    ge: { values: [">=", "ge"], is_binary: true, convert_non_factor: true, meta: "eq" },
    lt: { values: ["<", "lt"], is_binary: true, convert_non_factor: true, meta: "eq" },
    le: { values: ["<=", "le"], is_binary: true, convert_non_factor: true, meta: "eq" },
    ne: { label: "!=", values: ["<>", "!=", "ne"], is_binary: true, convert_non_factor: true, meta: "eq" },
    and: { label: "&&", values: ["&", "&&", "and"], is_binary: true, meta: "log" },
    or: { label: "||", values: ["|", "||", "or"], is_binary: true, meta: "log" },
    not: { label: "not", values: ["~", "!", "not"], is_binary: false, meta: "log" },
    xor: { values: ["xor"], is_binary: true, meta: "log" },
    neg: { label: "-(...)", values: ["-", "neg"], is_binary: false, meta: "super_math" },
    add: { values: ["+", "add"], is_binary: true, meta: "math" },
    sub: { values: ["-", "sub"], is_binary: true, meta: "math" },
    mul: { values: ["*", "mul"], is_binary: true, meta: "math" },
    div: { values: ["/", "div"], is_binary: true, meta: "math" },
    mod: { label: "mod", values: ["%", "mod"], is_binary: true, meta: "super_math" },
    pow: { values: ["^", "**", "pow"], is_binary: true, meta: "super_math" },
};

const temporal = {
    formula: {
        itemTypeOptions: [
            { value: "value", title: "Простое значение" },
            { value: "ref", title: "Ссылка на атрибут объекта" },
            {
                value: "operation",
                title: "Операция",
                selectable: false,
                children: [
                    {
                        value: "equatation",
                        title: "Операция сравнения",
                        selectable: false,
                        children: Object.entries(operations)
                            .filter(([_, op]) => op.meta === "eq")
                            .map(([value, op]) => Object({ value, title: op.label || op.values[0] })),
                    },
                    {
                        value: "mathematics",
                        title: "Арифметическая операция",
                        selectable: false,
                        children: Object.entries(operations)
                            .filter(([_, op]) => op.meta === "math")
                            .map(([value, op]) => Object({ value, title: op.label || op.values[0] })),
                    },
                    {
                        value: "logics",
                        title: "Логическая операция",
                        selectable: false,
                        children: Object.entries(operations)
                            .filter(([_, op]) => op.meta === "log")
                            .map(([value, op]) => Object({ value, title: op.label || op.values[0] })),
                    },
                ],
            },
        ],
    },
    operations: {
        b: {
            interval_interval: true,
            event_event: true,
            event_interval: true,
            allowed_left: ["event", "interval"],
            allowed_right: ["event", "interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "b",
            values: ["b"],
            default_tag: "b"
        },
        bi: {
            interval_interval: true,
            event_event: false,
            event_interval: false,
            allowed_left: ["interval"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "bi",
            values: ["bi"],
            default_tag: "bi"
        },
        m: {
            interval_interval: true,
            event_event: false,
            event_interval: false,
            allowed_left: ["interval"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "m",
            values: ["m"],
            default_tag: "m"
        },
        mi: {
            interval_interval: true,
            event_event: false,
            event_interval: false,
            allowed_left: ["interval"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "mi",
            values: ["mi"],
            default_tag: "mi"
        },
        s: {
            interval_interval: true,
            event_event: false,
            event_interval: true,
            allowed_left: ["event", "interval"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "s",
            values: ["s"],
            default_tag: "s"
        },
        si: {
            interval_interval: true,
            event_event: false,
            event_interval: false,
            allowed_left: ["interval"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "si",
            values: ["si"],
            default_tag: "si"
        },
        f: {
            interval_interval: true,
            event_event: false,
            event_interval: false,
            allowed_left: ["interval"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "f",
            values: ["f"],
            default_tag: "f"
        },
        fi: {
            interval_interval: true,
            event_event: false,
            event_interval: false,
            allowed_left: ["interval"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "fi",
            values: ["fi"],
            default_tag: "fi"
        },
        d: {
            interval_interval: true,
            event_event: false,
            event_interval: true,
            allowed_left: ["event", "interval"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "d",
            values: ["d"],
            default_tag: "d"
        },
        di: {
            interval_interval: true,
            event_event: false,
            event_interval: false,
            allowed_left: ["interval"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "di",
            values: ["di"],
            default_tag: "di"
        },
        o: {
            interval_interval: true,
            event_event: false,
            event_interval: false,
            allowed_left: ["interval"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "o",
            values: ["o"],
            default_tag: "o"
        },
        oi: {
            interval_interval: true,
            event_event: false,
            event_interval: false,
            allowed_left: ["interval"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "oi",
            values: ["oi"],
            default_tag: "oi"
        },
        e: {
            interval_interval: true,
            event_event: true,
            event_interval: false,
            allowed_left: ["event", "interval"],
            allowed_right: ["event", "interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "e",
            values: ["e"],
            default_tag: "e"
        },
        a: {
            interval_interval: false,
            event_event: false,
            event_interval: true,
            allowed_left: ["event"],
            allowed_right: ["interval"],
            is_binary: true,
            convert_non_factor: false,
            meta: "allen",
            label: "a",
            values: ["a"],
            default_tag: "a"
        },
    },
};

const evaluatable = {
    itemTypeOptions: [
        { value: "value", title: "Простое значение" },
        { value: "ref", title: "Ссылка на атрибут объекта" },
        {
            value: "operation",
            title: "Операция",
            selectable: false,
            children: [
                {
                    value: "equatation",
                    title: "Операция сравнения",
                    selectable: false,
                    children: Object.entries(operations)
                        .filter(([_, op]) => op.meta === "eq")
                        .map(([value, op]) => ({ value, title: op.label || op.values[0] })),
                },
                {
                    value: "mathematics",
                    title: "Арифметическая операция",
                    selectable: false,
                    children: Object.entries(operations)
                        .filter(([_, op]) => op.meta === "math" || op.meta === "super_math")
                        .map(([value, op]) => ({ value, title: op.label || op.values[0] })),
                },
                {
                    value: "logics",
                    title: "Логическая операция",
                    selectable: false,
                    children: Object.entries(operations)
                        .filter(([_, op]) => op.meta === "log")
                        .map(([value, op]) => ({ value, title: op.label || op.values[0] })),
                },
                {
                    value: "allen",
                    title: "Операция логики Аллена",
                    selectable: false,
                    children: Object.keys(temporal.operations).map((value) => ({ value, title: value })),
                },
            ],
        },
    ],
    itemTypeOptionsNoAllen: [
        { value: "value", title: "Простое значение" },
        { value: "ref", title: "Ссылка на атрибут объекта" },
        {
            value: "operation",
            title: "Операция",
            selectable: false,
            children: [
                {
                    value: "equatation",
                    title: "Операция сравнения",
                    selectable: false,
                    children: Object.entries(operations)
                        .filter(([_, op]) => op.meta === "eq")
                        .map(([value, op]) => ({ value, title: op.label || op.values[0] })),
                },
                {
                    value: "mathematics",
                    title: "Арифметическая операция",
                    selectable: false,
                    children: Object.entries(operations)
                        .filter(([_, op]) => op.meta === "math" || op.meta === "super_math")
                        .map(([value, op]) => ({ value, title: op.label || op.values[0] })),
                },
                {
                    value: "logics",
                    title: "Логическая операция",
                    selectable: false,
                    children: Object.entries(operations)
                        .filter(([_, op]) => op.meta === "log")
                        .map(([value, op]) => ({ value, title: op.label || op.values[0] })),
                },
            ],
        },
    ],
};

export { apiLocation, loadStatuses, operations, temporal, evaluatable };
