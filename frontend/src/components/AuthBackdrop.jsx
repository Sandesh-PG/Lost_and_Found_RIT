import React from "react";

const AuthBackdrop = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="auth-sheen auth-sheen-one" />
      <div className="auth-sheen auth-sheen-two" />
      <div className="auth-blob auth-blob-one" />
      <div className="auth-blob auth-blob-two" />
      <div className="auth-grid" />
      <div className="auth-wave auth-wave-one" />
      <div className="auth-wave auth-wave-two" />
      <div className="auth-orb auth-orb-one" />
      <div className="auth-orb auth-orb-two" />

      <div className="auth-floating-card auth-floating-card-one">
        <span>Report lost</span>
        <strong>Fast recovery flow</strong>
      </div>
      <div className="auth-floating-card auth-floating-card-three">
        <span>Smart search</span>
        <strong>Filter by item or location</strong>
      </div>
      <div className="auth-floating-card auth-floating-card-two">
        <span>Browse found</span>
        <strong>Live community updates</strong>
      </div>
      <div className="auth-floating-card auth-floating-card-four">
        <span>Secure login</span>
        <strong>Access your profile safely</strong>
      </div>
    </div>
  );
};

export default AuthBackdrop;