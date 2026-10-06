import React, { useState } from 'react';
import { HiMicrophone, HiStop } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const VoiceSearch = ({ onVoiceResult }) => {
    const [isListening, setIsListening] = useState(false);

    const handleToggleVoice = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast.error("Voice search is not supported in this browser. Try Chrome / Edge!");
            return;
        }

        if (isListening) {
            setIsListening(false);
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-IN';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                setIsListening(true);
                toast.loading("Listening... Speak a grocery item (e.g. 'Amul milk', 'Potatoes')", { id: 'voice-search' });
            };

            recognition.onresult = (event) => {
                const speechResult = event.results[0][0].transcript;
                setIsListening(false);
                toast.success(`Heard: "${speechResult}"`, { id: 'voice-search' });
                if (onVoiceResult) {
                    onVoiceResult(speechResult);
                }
            };

            recognition.onerror = (event) => {
                setIsListening(false);
                toast.error(`Voice recognition: ${event.error}`, { id: 'voice-search' });
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
        } catch (err) {
            setIsListening(false);
            toast.error("Could not start voice search");
        }
    };

    return (
        <button
            type="button"
            onClick={handleToggleVoice}
            title={isListening ? "Listening... click to stop" : "Voice Search (Speech to Text)"}
            className={`p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                isListening 
                    ? "bg-rose-500 text-white animate-pulse shadow-md" 
                    : "text-gray-400 hover:text-emerald-700 hover:bg-gray-100"
            }`}
        >
            {isListening ? (
                <div className="flex items-center gap-1 px-1">
                    <span className="w-1.5 h-3 bg-white rounded-full animate-bounce [animation-delay:0s]" />
                    <span className="w-1.5 h-4 bg-white rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
            ) : (
                <HiMicrophone className="w-4 h-4 text-emerald-700" />
            )}
        </button>
    );
};

export default VoiceSearch;
