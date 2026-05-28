type PostFormHeaderProps = {
    editId: number | null;
};

export function PostFormHeader({
                                   editId,
                               }: PostFormHeaderProps) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold">
                {editId
                    ? "Редактирование поста"
                    : "Добавление поста"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
                {editId
                    ? "Измени данные и нажми кнопку обновления."
                    : "Заполни поля и создай новый пост."}
            </p>
        </div>
    );
}