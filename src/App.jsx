import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

function App() {
  const [userList, setUseList] = useState([]);
  const [genderOptions] = useState(['Neutro', 'Mujer', 'Hombre']);

  const handleAddUser = (values, { resetForm }) => {
    let tempUserList = [...userList];
    tempUserList.push(values);
    setUseList(tempUserList);
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ name: '', surname: '', age: '', gender: '0' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Campo obligatorio').min(3,'Mínimo 3 caracteres').max(10,'Máximo 10 caracteres'),
          surname: Yup.string().required('Campo obligatorio'),
          age: Yup.number().required('Campo obligatorio').min(18,'Hay que ser mayor de edad'),
          // gender: Yup.string().required('Campo obligatorio'),
        })}
        validateOnBlur={false}
        validateOnChange={false}
        // onSubmit={(values, { resetForm }) => handleAddUser(values, resetForm)} igual linea de abajo
        onSubmit={handleAddUser}
      >
        {({ errors }) => (
          <Form>
            {errors && (
              <>
                <div>{errors.name && <span>Nombre: {errors.name}</span>}</div>
                <div>
                  {errors.surname && <span>Apellidos: {errors.surname}</span>}
                </div>
                <div>{errors.age && <span>Edad: {errors.age}</span>}</div>
                {/* <div>
                  {errors.gender && <span>Género: {errors.gender}</span>}
                </div> */}
              </>
            )}
            <Field
              type="text"
              name="name"
              placeholder="Nombre"
              style={errors.name && { borderColor: 'red' }}
            />
            <Field
              type="text"
              name="surname"
              placeholder="Apelidos"
              style={errors.surname && { borderColor: 'red' }}
            />
            <Field
              type="number"
              name="age"
              placeholder="Edad"
              style={errors.age && { borderColor: 'red' }}
            />
            <Field as="select" name="gender" placeholder="Género">
              <option value="0">Neutro</option>
              <option value="1">Mujer</option>
              <option value="2">Hombre</option>
            </Field>
            <button type="submit">Enviar</button>
          </Form>
        )}
      </Formik>

      <table style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Edad</th>
            <th>Género</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.age}</td>
              <td>{genderOptions[user.gender]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
