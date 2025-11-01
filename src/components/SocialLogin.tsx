import { useState } from 'react';
import { Chrome, Facebook, X, Eye, EyeOff, Mail } from 'lucide-react';

interface GoogleAccount {
  email: string;
  name: string;
  avatar?: string;
}

interface SocialLoginProps {
  onLoginSuccess: (userData: { name: string; email: string }) => void;
  onBack: () => void;
}

const mockGoogleAccounts: GoogleAccount[] = [
  {
    email: 'john.doe@gmail.com',
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    email: 'sarah.smith@gmail.com',
    name: 'Sarah Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    email: 'michael.johnson@gmail.com',
    name: 'Michael Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
  }
];

type Step = 'provider' | 'google_select' | 'password';

export default function SocialLogin({ onLoginSuccess, onBack }: SocialLoginProps) {
  const [step, setStep] = useState<Step>('provider');
  const [selectedAccount, setSelectedAccount] = useState<GoogleAccount | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setStep('google_select');
    setError('');
  };

  const handleAccountSelect = (account: GoogleAccount) => {
    setSelectedAccount(account);
    setStep('password');
    setPassword('');
    setError('');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (selectedAccount) {
        onLoginSuccess({
          name: selectedAccount.name,
          email: selectedAccount.email
        });
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackFromPassword = () => {
    setStep('google_select');
    setPassword('');
    setError('');
  };

  const handleBackFromGoogleSelect = () => {
    setStep('provider');
    setError('');
  };

  if (step === 'provider') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Continue Login</h2>
            <p className="text-gray-600">Choose a social platform to login</p>
          </div>

          <div className="space-y-3 mb-8">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </button>

            <button
              disabled
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 opacity-50 cursor-not-allowed"
            >
              <Facebook className="w-5 h-5" />
              Continue with Facebook
            </button>
          </div>

          <button
            onClick={onBack}
            className="w-full px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (step === 'google_select') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Choose your Google Account</h2>
            <button
              onClick={handleBackFromGoogleSelect}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2 mb-6">
            {mockGoogleAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => handleAccountSelect(account)}
                className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center gap-3"
              >
                <img
                  src={account.avatar}
                  alt={account.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{account.name}</p>
                  <p className="text-sm text-gray-600">{account.email}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
              disabled
            >
              <Mail className="w-5 h-5" />
              Use another account
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'password' && selectedAccount) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Enter Password</h2>
            <button
              onClick={handleBackFromPassword}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center gap-3">
            <img
              src={selectedAccount.avatar}
              alt={selectedAccount.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900 text-sm">{selectedAccount.name}</p>
              <p className="text-gray-600 text-sm">{selectedAccount.email}</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                Forgot password?
              </a>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBackFromPassword}
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Your password is secure and encrypted
          </p>
        </div>
      </div>
    );
  }

  return null;
}
