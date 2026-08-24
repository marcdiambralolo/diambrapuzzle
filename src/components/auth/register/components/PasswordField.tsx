'use client';
import { Lock } from 'lucide-react';
import { RegisterInputField } from './RegisterInputField';
import { RegisterPasswordStrengthIndicator } from './RegisterPasswordStrengthIndicator';

interface PasswordFieldProps {
    password: string;
    showPassword: boolean;
    onTogglePassword: () => void;
    error?: string;
    passwordStrength: number;
}

const PasswordField = ({ password, showPassword, onTogglePassword, error, passwordStrength }: PasswordFieldProps) => (
    <div>
        <RegisterInputField
            label="Mot de passe"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={() => { }}
            error={error}
            placeholder=""
            icon={<Lock className="w-4 h-4" />}
            showPassword={showPassword}
            onTogglePassword={onTogglePassword}
        />
        {password && <RegisterPasswordStrengthIndicator strength={passwordStrength} />}
    </div>
);

export default PasswordField;