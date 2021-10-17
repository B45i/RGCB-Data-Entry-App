import { Formik, Form, Field } from 'formik';
import FormItem from './FormItem';

const submitHandler = (values, actions) => {
    console.log('submitted');
    console.log({ values, actions });
};

const formValue = {
    name: '',
    image: '',
    symptoms: [{ items: [{ text: '' }] }],
    ingredients: [
        {
            title: '',
            items: [
                {
                    image: '',
                    text: '',
                },
            ],
        },
    ],
    preparation: [
        {
            title: '',
            items: [
                {
                    text: '',
                },
            ],
        },
    ],
    application: [
        {
            title: '',
            items: [
                {
                    text: '',
                },
            ],
        },
    ],
    extra: [
        {
            title: '',
            items: [
                {
                    text: '',
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

                    <FormItem
                        label={'Symptoms'}
                        controlName={'symptoms'}
                        hasTitle={false}
                    />
                    <FormItem
                        label={'Ingredients'}
                        controlName={'ingredients'}
                        hasImage
                    />
                    <FormItem
                        label={'Preparation'}
                        controlName={'preparation'}
                    />
                    <FormItem
                        label={'Application'}
                        controlName={'application'}
                    />
                    <FormItem label={'Extra'} controlName={'extra'} />

                    <button type="submit" className="btn btn-primary my-3">
                        Save Data
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default DiseaseForm;
