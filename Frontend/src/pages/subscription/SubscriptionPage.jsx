import React, { useState } from 'react';
import Navbar from "../../components/NavBar";
import { User, Mail, Phone, Hash, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

const SubscriptionForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', contactNo: '', transactionId: '', examType: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Navbar /> 

      <div className="flex-grow flex justify-center items-center p-4" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className="card w-full max-w-[380px] bg-base-100 shadow-lg border border-base-300 rounded-2xl overflow-hidden">
          <div className="card-body p-6 flex flex-col justify-between">

            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-14 h-14 bg-primary text-primary-content rounded-xl flex items-center justify-center shadow mb-2">
                <GraduationCap size={28} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Premium Subscription</h2>
              <p className="text-xs opacity-50 mt-1">Activate your account for full access</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">

              {/* Full Name */}
              <div className="form-control">
                <label className="label pt-0">
                  <span className="label-text font-bold text-[10px] uppercase">Full Name</span>
                </label>
                {/* ADDED: focus-within:border-primary to ensure the border glows when the input is clicked */}
                <label className="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:border-primary transition-colors">
                  <User size={16} className="opacity-30" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Enter full name"
                    className="grow h-10 text-sm focus:outline-none" // ADDED: focus:outline-none to prevent double borders
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label pt-0">
                  <span className="label-text font-bold text-[10px] uppercase">Email Address</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:border-primary transition-colors">
                  <Mail size={16} className="opacity-30" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="email@domain.com"
                    className="grow h-10 text-sm focus:outline-none"
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              {/* Exam Selection */}
              <div className="form-control">
                <label className="label pt-0">
                  <span className="label-text font-bold text-[10px] uppercase">Target Exam</span>
                </label>
                <select
                  name="examType"
                  className="select select-bordered w-full h-10 text-sm focus:outline-none focus:border-primary"
                  onChange={handleChange}
                  required
                  value={formData.examType}
                >
                  <option value="" disabled>Select course</option>
                  <option value="IOE">IOE (Engineering)</option>
                  <option value="IOM">IOM (Medical)</option>
                  <option value="CSIT">B.Sc CSIT</option>
                  <option value="BCA">BCA</option>
                </select>
              </div>

              
              <div className="grid grid-cols-2 gap-2">
                <div className="form-control">
                  <label className="label pt-0">
                    <span className="label-text font-bold text-[10px] uppercase">Phone</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-1 focus-within:outline-none focus-within:border-primary transition-colors">
                    <Phone size={14} className="opacity-30" />
                    <input
                      type="tel"
                      name="contactNo"
                      value={formData.contactNo}
                      placeholder="98..."
                      className="grow h-10 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label pt-0">
                    <span className="label-text font-bold text-[10px] uppercase">TRX ID</span>
                  </label>
                
                  <label className="input input-bordered flex items-center gap-1 focus-within:outline-none focus-within:border-primary transition-colors">
                    <Hash size={14} className="opacity-30" />
                    <input
                      type="text"
                      name="transactionId"
                      value={formData.transactionId}
                      placeholder="ID"
                      className="grow h-10 text-sm uppercase font-mono focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="btn btn-primary w-full text-white text-sm h-12 shadow hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Subscribe
                  <ArrowRight size={18} className="ml-1" />
                </button>

                <div className="flex justify-center items-center gap-2 mt-3 py-1 px-3 bg-base-200 rounded-full w-fit mx-auto text-[9px]">
                  <ShieldCheck size={12} className="text-success" />
                  <span className="font-bold uppercase tracking-wider opacity-60">Secure Verification</span>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;