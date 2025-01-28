import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Button, Input, Typography } from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function SignUp() {
    const navigate = useNavigate();
    const { user, login, logout, isUserValid } = useContext(UserContext);

    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fullName) newErrors.fullName = 'Full Name is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await axios.post('https://conference-website-rp.onrender.com/api/users/register', { fullName, password, email });
            setOtpSent(true); // OTP sent, waiting for verification
        } catch (error) {
            console.error(error);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://conference-website-rp.onrender.com/api/users/verify-otp', { email, otp })
                .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    const decodedToken = jwtDecode(response.data.token)
                    login(decodedToken);
                    navigate('/user/dashboard');
                })
            console.log(response.data.token);
        } catch (error) {
            console.error('Invalid OTP or error occurred.', error);
        }
    };


    return (
        <div>
            <Typography variant="h3" color="blue-gray" className="mb-2">
                Sign Up
            </Typography>
            <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
                Enter your email and password to sign up
            </Typography>

            {!otpSent ? (
                <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
                    
                    <div className="mb-6">
                        <label htmlFor="fullName">
                            <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                                Your Full Name
                            </Typography>
                        </label>
                        <Input
                            onChange={(e) => setFullName(e.target.value)}
                            label='Full Name'
                            id="fullName"
                            color="gray"
                            size="lg"
                            type="text"
                            name="fullName"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            value={fullName}
                        />
                        {errors.fullName && <Typography color="red" variant="small">{errors.fullName}</Typography>}
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="email">
                            <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                                Your Email
                            </Typography>
                        </label>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            label='Email'
                            id="email"
                            color="gray"
                            size="lg"
                            type="email"
                            name="email"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            value={email}
                        />
                        {errors.email && <Typography color="red" variant="small">{errors.email}</Typography>}
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="password">
                            <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                                Password
                            </Typography>
                        </label>
                        <Input
                            label='Password'
                            size="lg"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            type={passwordShown ? "text" : "password"}
                            icon={
                                <i onClick={togglePasswordVisibility}>
                                    {passwordShown ? (
                                        <EyeIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    )}
                                </i>
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <Typography color="red" variant="small">{errors.password}</Typography>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword">
                            <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                                Confirm Password
                            </Typography>
                        </label>
                        <Input
                            label='Confirm Password'
                            size="lg"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            type={passwordShown ? "text" : "password"}
                            icon={
                                <i onClick={togglePasswordVisibility}>
                                    {passwordShown ? (
                                        <EyeIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    )}
                                </i>
                            }
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <Typography color="red" variant="small">{errors.confirmPassword}</Typography>}
                    </div>
                    
                    <Button type="submit" color="gray" size="lg" className="mt-6" fullWidth>
                        Sign up
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit} className="mx-auto max-w-[24rem] text-left">
                    <div className="mb-6">
                        <label htmlFor="otp">
                            <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                                Enter OTP
                            </Typography>
                        </label>
                        <Input
                            onChange={(e) => setOtp(e.target.value)}
                            label='OTP'
                            id="otp"
                            color="gray"
                            size="lg"
                            type="text"
                            name="otp"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            value={otp}
                        />
                    </div>
                    <Button type="submit" color="gray" size="lg" className="mt-6" fullWidth>
                        Verify OTP
                    </Button>
                </form>
            )}
            
        </div>
    );
}

export default SignUp;