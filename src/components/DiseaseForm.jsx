import { Formik, Form, Field } from 'formik';
import FormItem from './FormItem';

const submitHandler = (values, actions) => {
    console.log('submitted');
    console.log({ values, actions });
};

const formValue = {
    name: '',
    image: '',
    symptoms: [''],
    ingredients: [
        {
            title: 'Ingredients for external application',
            items: [
                {
                    image: 'aloevera.jpg',
                    text: 'Aloe vera whole leaf cut from the base– 250 grams (do not remove the outer skin)',
                },
            ],
        },
    ],
};

const DiseaseForm = () => {
    return (
        <div className="mt-3">
            <Formik initialValues={formValue} onSubmit={submitHandler}>
                <Form>
                    <div className="mb-3 p-3 bg-light">
                        <label className="form-label">Name</label>
                        <Field
                            name="name"
                            className="form-control"
                            placeholder="Name of the disease"
                        />
                    </div>

                    <div className="mb-3 p-3 bg-light">
                        <label className="form-label">Image</label>
                        <Field
                            name="image"
                            className="form-control"
                            placeholder="Name of the disease"
                        />
                    </div>

                    {/* <div className="mb-3 p-3 bg-light">
                        <label className="form-label">Symptoms</label>
                        <FieldArray
                            name="symptoms"
                            render={arrayHelpers => {
                                const { form, name } = arrayHelpers;
                                const values = form.values[name] || [];
                                return values.map((formItem, i) => (
                                    <div className="mb-2" key={i}>
                                        <Field
                                            className="form-control"
                                            name={`${name}.${i}`}
                                        />
                                    </div>
                                ));
                            }}
                        />
                    </div> */}

                    <FormItem label={'Ingredients'} />

                    <button type="submit" className="btn btn-success mt-3">
                        Save
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default DiseaseForm;
