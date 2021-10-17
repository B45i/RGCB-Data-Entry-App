import { Field, FieldArray } from 'formik';

const FormItem = ({
    label,
    controlName,
    hasImage = false,
    hasTitle = true,
}) => {
    let pushGroup;
    let removeGroup;
    let pushItem;
    let removeItem;

    const bindGroupMethods = ({ push, remove }) => {
        pushGroup = push;
        removeGroup = remove;
    };

    const bindItemMethods = ({ push, remove }) => {
        pushItem = push;
        removeItem = remove;
    };

    const addGroupHandler = e => {
        e.preventDefault();

        if (pushGroup) {
            pushGroup({
                title: '',
                items: [
                    {
                        text: '',
                        ...(hasImage && { image: '' }),
                    },
                ],
            });
        }
    };

    const addItemHandler = e => {
        e.preventDefault();
        if (pushItem) {
            pushItem({
                text: '',
                ...(hasImage && { image: '' }),
            });
        }
    };

    const removeGroupHandler = i => {
        removeGroup(i);
    };

    const removeItemHandler = i => {
        removeItem(i);
    };

    return (
        <div className="mb-3 p-3 bg-light">
            <label className="form-label">{label}</label>

            <FieldArray
                name={controlName}
                render={arrayHelpers => {
                    bindGroupMethods(arrayHelpers);
                    const { form, name } = arrayHelpers;
                    const values = form.values[name] || [];
                    return values.map((formItem, i) => (
                        <div
                            className="mb-2 border border-dark p-2 d-flex"
                            key={i}
                        >
                            <div className="flex-grow-1">
                                {hasTitle && (
                                    <Field
                                        className="form-control"
                                        name={`${name}.${i}.title`}
                                        placeholder={`${label} Title`}
                                    />
                                )}

                                <FieldArray
                                    name={`${name}.${i}.items`}
                                    render={arrayHelpers => {
                                        bindItemMethods(arrayHelpers);
                                        return (formItem.items || []).map(
                                            (innerFormItem, j) => (
                                                <div
                                                    key={j}
                                                    className="mt-2 p-3 border d-flex"
                                                >
                                                    <div className="flex-grow-1">
                                                        <Field
                                                            className="form-control mb-2"
                                                            name={`${name}.${i}.items.${j}.text`}
                                                            placeholder={`${label} item text`}
                                                        />

                                                        {hasImage && (
                                                            <Field
                                                                className="form-control"
                                                                name={`${name}.${i}.items.${j}.image`}
                                                                placeholder={`${label} item image`}
                                                            />
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            removeItemHandler(
                                                                j
                                                            );
                                                        }}
                                                        className="btn btn-danger align-self-start"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )
                                        );
                                    }}
                                />
                                <button
                                    onClick={addItemHandler}
                                    className="btn btn-success w-100 mt-2"
                                >
                                    Add item
                                </button>
                            </div>
                            {hasTitle && (
                                <button
                                    onClick={e => removeGroupHandler(i)}
                                    className="btn btn-danger align-self-start"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ));
                }}
            />
            {hasTitle && (
                <button
                    onClick={addGroupHandler}
                    className="btn btn-success w-100"
                >
                    Add
                </button>
            )}
        </div>
    );
};

export default FormItem;
