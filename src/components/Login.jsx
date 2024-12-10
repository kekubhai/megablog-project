import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'; // Add this import

function Login() {
    const { t } = useTranslation(); // Initialize translation hook
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm(); // Access errors
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Added min-h-screen */}
            <div className="mx-auto w-full max-w-md bg-white rounded-lg shadow-lg p-8"> {/* Improved styling */}
                <div className="mb-6 text-center">
                    <Logo width="100px" /> {/* Adjusted width */}
                    <h2 className="text-2xl font-bold mt-4">{t('login.title')}</h2> {/* Use translation */}
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">{t('login.error')}</strong> {/* Use translation */}
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <Input
                        label={t('login.email')} {/* Use translation */}
                        placeholder={t('login.emailPlaceholder')} {/* Use translation */}
                        type="email"
                        {...register('email', {
                            required: t('login.emailRequired'), {/* Use translation */}
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: t('login.emailInvalid'), {/* Use translation */}
                            },
                        })}
                        error={errors.email} {/* Display error message */}
                    />
                    <Input
                        label={t('login.password')} {/* Use translation */}
                        placeholder={t('login.passwordPlaceholder')} {/* Use translation */}
                        type="password"
                        {...register('password', {
                            required: t('login.passwordRequired'), {/* Use translation */}
                        })}
                        error={errors.password} {/* Display error message */}
                    />
                    <Button type="submit" className="w-full">{t('login.signIn')}</Button> {/* Use translation */}
                </form>
                <p className="text-center mt-4 text-gray-600">
                    {t('login.noAccount')} {/* Use translation */}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        {t('login.signUp')} {/* Use translation */}
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;

  )
}

export default Login
