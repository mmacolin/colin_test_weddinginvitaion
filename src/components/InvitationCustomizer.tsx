import React, { useState } from 'react';
import { Sliders, X, Check, RotateCcw, Heart } from 'lucide-react';
import { WeddingData } from '../types';

interface InvitationCustomizerProps {
  wedding: WeddingData;
  onSave: (newData: WeddingData) => void;
  onReset: () => void;
  onClose: () => void;
}

export const InvitationCustomizer: React.FC<InvitationCustomizerProps> = ({
  wedding,
  onSave,
  onReset,
  onClose,
}) => {
  const [formData, setFormData] = useState<WeddingData>({ ...wedding });

  const handleChange = (field: keyof WeddingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#1e2f2f] text-stone-100 rounded-2xl border border-[#c5a059]/40 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-[#253a3a] border-b border-[#c5a059]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#c5a059]" />
            <h3 className="text-sm sm:text-base font-serif font-semibold text-[#f1e1be]">
              Customize Wedding Invitation (React Template)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-700/60 text-stone-300">
            Customize any detail below to test how easily Memento Cambodia digital invitations can be created, styled, and customized in React!
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-300 mb-1 font-medium">Groom Name (English)</label>
              <input
                type="text"
                value={formData.groomName}
                onChange={(e) => handleChange('groomName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            <div>
              <label className="block text-stone-300 mb-1 font-medium">Groom Name (Khmer)</label>
              <input
                type="text"
                value={formData.groomNameKhmer}
                onChange={(e) => handleChange('groomNameKhmer', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-300 mb-1 font-medium">Bride Name (English)</label>
              <input
                type="text"
                value={formData.brideName}
                onChange={(e) => handleChange('brideName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            <div>
              <label className="block text-stone-300 mb-1 font-medium">Bride Name (Khmer)</label>
              <input
                type="text"
                value={formData.brideNameKhmer}
                onChange={(e) => handleChange('brideNameKhmer', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-medium">Wedding Date (Display)</label>
            <input
              type="text"
              value={formData.weddingDateDisplay}
              onChange={(e) => handleChange('weddingDateDisplay', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-medium">Venue Name</label>
            <input
              type="text"
              value={formData.venueName}
              onChange={(e) => handleChange('venueName', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-medium">Ballroom / Hall</label>
            <input
              type="text"
              value={formData.venueRoom}
              onChange={(e) => handleChange('venueRoom', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-medium">Venue Address</label>
            <textarea
              rows={2}
              value={formData.venueAddress}
              onChange={(e) => handleChange('venueAddress', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Suyhong &amp; Vinaya</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#c5a059] text-stone-950 font-semibold hover:brightness-110 shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Apply Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
