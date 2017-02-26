

export type PostType =
    "🖋"
    | "✏"
    | "💭"
    | "🗣"
;

export const typeMap = {

    // 🖋️ (pen)
    blog: "🖋" as PostType,

    // ✏ (pencil)
    microblog: "✏" as PostType,

    // 💭 (thought balloon)
    social: "💭" as PostType,

    // 🗣 (speaking head)
    comment: "🗣" as PostType
};
