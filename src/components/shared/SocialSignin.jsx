"use client"
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";

const SocialSignin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const path = searchParams.get('redirect');

  const handleSocialLogin = async (provider) => {
    try {
      setError(null);
      setLoading(provider);
      
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: path ? path : '/'
      });

      if (result?.error) {
        console.error(`${provider} sign in error:`, result.error);
        setError(`${provider} sign in failed. Check console for details.`);
      } else if (result?.ok) {
        router.push(result.url || (path ? path : '/'));
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setError(`${provider} login error. Please try again.`);
    } finally {
      setLoading(null);
    }
  };
    
  return (
    <div>
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={() => handleSocialLogin('google')}
          disabled={loading !== null}
          className="btn btn-circle btn-outline hover:btn-primary"
          title="Sign in with Google"
          aria-label="Sign in with Google"
        >
          {loading === 'google' ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <BsGoogle size={24} className="text-green-500" />
          )}
        </button>

        <button 
          onClick={() => handleSocialLogin('github')}
          disabled={loading !== null}
          className="btn btn-circle btn-outline hover:btn-primary"
          title="Sign in with GitHub"
          aria-label="Sign in with GitHub"
        >
          {loading === 'github' ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <BsGithub size={24} className="text-primary" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialSignin;
