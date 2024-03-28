import React, { useState } from 'react';
import { BrunoError, toastError } from 'utils/common/error';
import Modal from 'components/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from 'providers/ReduxStore/slices/app';

const login = async (values) => {
  const response = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new BrunoError(error.message);
  }
  return response.json();
};
const Login = ({ onClose }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required(),
      password: Yup.string().required()
    }),
    onSubmit: (values) => {
      login(values)
        .then((data) => {
          dispatch(saveUser(data));
          onClose();
        })
        .catch((err) => toastError(err, 'Login failed'));
    }
  });

  return (
    <Modal size="sm" title="Login" hideFooter={true} handleConfirm={onClose} handleCancel={onClose}>
      <form className="bruno-form" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="settings-label" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            //type="email"
            name="email"
            placeholder="Enter your email address"
            className="block textbox w-full"
            onChange={formik.handleChange}
            value={formik.values.email || ''}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="ml-1 text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label className="settings-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            className="block textbox w-full"
            onChange={formik.handleChange}
            value={formik.values.password || ''}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="ml-1 text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mt-6">
          <button type="submit" className="submit btn btn-sm btn-secondary">
            Login
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Login;
