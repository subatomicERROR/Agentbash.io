import React from 'react';
import { Agent, OperatingSystem } from '../types';

type IconProps = React.SVGProps<SVGSVGElement>;

export const WindowsIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M11.4 22.5V12.6H2V22.5H11.4ZM11.4 1.5V11.4H2V1.5H11.4ZM22 22.5V12.6H12.6V22.5H22ZM22 1.5V11.4H12.6V1.5H22Z" />
    </svg>
);

export const LinuxIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 261 306" {...props}>
        <g>
            {/* Feet */}
            <path fill="#FFC500" d="M103.2,305.81c-22.33,0-40.44-18.11-40.44-40.44V224.92h80.88v40.44C143.64,287.7,125.53,305.81,103.2,305.81z"/>
            <path fill="#FFC500" d="M157.47,305.81c-22.33,0-40.44-18.11-40.44-40.44V224.92h80.88v40.44C197.91,287.7,179.8,305.81,157.47,305.81z"/>
            
            {/* Body */}
            <path fill="#000000" d="M255.4,146.33c0,77.5-60.52,120.59-128.52,120.59S-1.62,223.83-1.62,146.33S58.9,0,126.88,0S255.4,68.83,255.4,146.33z"/>

            {/* Belly */}
            <path fill="#FFFFFF" d="M190.58,154.2c0,42.5-28.54,77.2-63.7,77.2s-63.7-34.7-63.7-77.2s28.54-77.2,63.7-77.2S190.58,111.7,190.58,154.2z"/>

            {/* Beak */}
            <path fill="#FFC500" d="M126.88,230.15c-15,0-27.17-12.17-27.17-27.17s12.17-27.17,27.17-27.17s27.17,12.17,27.17,27.17S141.88,230.15,126.88,230.15z"/>

            {/* Eyes */}
            <ellipse fill="#FFFFFF" cx="81.56" cy="110.45" rx="20.91" ry="31.37"/>
            <ellipse fill="#FFFFFF" cx="172.2" cy="110.45" rx="20.91" ry="31.37"/>
            <circle fill="#000000" cx="77.01" cy="108.57" r="9.9"/>
            <circle fill="#000000" cx="167.66" cy="108.57" r="9.9"/>
        </g>
    </svg>
);


export const SendIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);


export const UserIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const AIIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
  </svg>
);

export const ReactIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" {...props}>
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
    </svg>
);

export const RocketIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.1S5.21 15.66 4.5 16.5z" />
      <path d="M19.5 4.5c1.5-1.26 2-5 2-5s-3.74.5-5 2c-.71.84-.7 2.3-.05 3.1s1.34 1.25 2.05 2.05z" />
      <path d="M12.5 11.5L9.5 8.5" />
      <path d="M11 22a7 7 0 0 0-7-7" />
      <path d="M13 2a7 7 0 0 0 7 7" />
    </svg>
);

export const SettingsIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const PaperclipIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

export const FileZipIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 18v-1a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
    <path d="M8 15h4" />
    <path d="M8 12h4" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ImageIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export const FileIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

export const ClipboardIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const NodeJSIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="#68a063" {...props}>
    <path d="M12.352,2.021L0.465,8.887v6.226l11.887,6.866l11.887-6.866V8.887L12.352,2.021z M11.887,14.652v-4.46l-4.706-2.717v2.231 l2.353,1.358v2.23l-2.353,1.358v2.23l4.706-2.717V14.652z M12.822,14.652v-4.46l4.706-2.717v2.231l-2.353,1.358v2.23l2.353,1.358v2.23 l-4.706-2.717V14.652z M12.352,3.38l9.412,5.434l-9.412,5.434L2.94,8.814L12.352,3.38z" />
  </svg>
);

export const DockerIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="#0db7ed" {...props}>
        <path d="M22.12,9.45c-1-2-2.38-3.48-3.8-4.66L15,3.22c-1-.7-2.38-1.07-3.79-1.07H5.25c-1.42,0-2.8,1.2-3.42,2.52l-1.3,2.69 c-.43,1-.63,2.09-.63,3.18v6.2c0,1.2,.23,2.39,.7,3.48l1.32,2.66c.63,1.32,1.88,2.15,3.32,2.15h8.92c1.45,0,2.88-.84,3.52-2.2 l1.3-2.67c.43-1,.63,2.09,.63-3.18v-2.1C22.75,11.55,22.55,10.45,22.12,9.45z M12.75,12.75H4.5v-2.25h8.25V12.75z M15,12.75H4.5 V8.25h10.5V12.75z M17.25,12.75H4.5V6h12.75V12.75z M19.5,12.75H4.5V3.75h15V12.75z" />
    </svg>
);

export const SqlIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

export const VueIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 256 221" {...props}>
        <path fill="#41B883" d="M204.8,0,128,134.4,51.2,0H0L128,220.8,256,0Z" />
        <path fill="#34495E" d="M204.8,0,128,134.4,51.2,0H99.84L128,44.8,156.16,0Z" />
    </svg>
);

export const GitHubActionsIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m14.31 8 5.74 9.94" />
    <path d="m9.69 8-5.74 9.94" />
    <path d="m21.23 7.76-12 1" />
    <path d="m2.77 7.76 12 1" />
    <path d="m12 2 4.5 8.5-9 2.5" />
  </svg>
);

export const PostgresqlIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="#336791" {...props}>
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5V13.43C8.4,13.14 7.5,12.12 7.5,10.27C7.5,8.22 9.07,7.5 10.75,7.5H13V16.5H15.5V7.5C15.5,5.5 13,4.5 10.75,4.5C8.5,4.5 6,5.5 6,7.5C6,9.1 6.8,10.61 8.5,11.2V11.27C6.8,11.92 6,13.3 6,15A3.5,3.5 0 0,0 9.5,18.5H15.5V16.5H10Z" />
  </svg>
);

export const MobileIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

export const SaaSIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
    <path d="M8 16h.01" />
    <path d="M8 20h.01" />
    <path d="M12 18h.01" />
    <path d="M12 22h.01" />
    <path d="M16 16h.01" />
    <path d="M16 20h.01" />
  </svg>
);

export const APIIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
    <path d="m14.5 4-5 16" />
  </svg>
);

export const NextJSIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 128 128" {...props}>
    <path fill="#000000" d="M64 0C28.65 0 0 28.65 0 64s28.65 64 64 64 64-28.65 64-64S99.35 0 64 0zm0 119.58C33.02 119.58 8.42 94.98 8.42 64S33.02 8.42 64 8.42 119.58 33.02 119.58 64 94.98 119.58 64 119.58z" />
    <path fill="#000000" d="M89.28 40.55h-11.4L42.5 86.84V40.55H32.62v54.26h9.88L89.28 40.55z" />
    <path fill="#000000" d="M96.79 40.55h-8.42v54.26h8.42z" />
  </svg>
);

export const AngularIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 250 250" {...props}>
    <polygon fill="#DD0031" points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 203.9,186.3 218.1,63.2" />
    <polygon fill="#C3002F" points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2" />
    <path fill="#FFFFFF" d="M125,52.1L66.8,182.6h21.7l11.7-29.2h49.4l11.7,29.2h21.7L125,52.1z M142,135.4H108.1l16.9-42.2L142,135.4z" />
  </svg>
);

export const SvelteIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 512 512" fill="#ff3e00" {...props}>
        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm118.4 313.4c-9 22.1-23.9 39.5-43.2 48.9-18.7 9.1-39.2 13.8-60.3 13.8-32.2 0-61.9-8.7-87.2-25.6-26.6-17.8-45.2-42.5-54.3-72.3-9.2-29.8-8.8-61.5 1.1-91.8 10.3-31.3 29.9-57.9 56.4-76.8 26.5-18.9 57.5-28.9 89.2-28.9 22.1 0 43.4 4.5 62.7 13.2 18.7 8.5 34.9 21.6 47.1 38.1l-50.6 39.5c-3.6-5.8-8.3-10.7-13.8-14.3-5.5-3.6-11.6-6-18-6.9-6.4-1-12.8-.8-18.8 1.4-6.1 2.2-11.6 5.8-16.1 10.4-4.5 4.6-8 10.2-10.2 16.3-2.2 6.1-3 12.6-2.4 18.9.6 6.3 2.5 12.4 5.7 17.9 3.2 5.5 7.6 10.1 12.9 13.6 5.3 3.5 11.4 5.8 17.7 6.6 6.3.8 12.6.4 18.5-1.9 5.9-2.3 11.2-5.9 15.6-10.6l51.5 39.2c-12.8 21.1-31.1 37.8-52.9 48.4zm-118.4-57.4zm0 0" />
    </svg>
);

export const TerraformIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="#623CE7" {...props}>
    <path d="M3.375,2.063L12,6.875v8.5L3.375,10.563V2.063z M12,8.063l8.625-4.75v8.5L12,16.563V8.063z M2.625,12.25l8.625,4.75v5.5 l-8.625-4.813V12.25z" />
  </svg>
);

export const AWSIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="#FF9900" {...props}>
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10.4,15.15L8.24,14.61L10.3,7.3L12.5,7.84L10.4,15.15M15.76,14.61L13.6,15.15L11.5,7.84L13.7,7.3L15.76,14.61M7.5,17.15L5.85,15.63L9.67,11.33L10.85,13.66L7.5,17.15M16.5,17.15L13.15,13.66L14.33,11.33L18.15,15.63L16.5,17.15Z" />
  </svg>
);

export const GCPIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <path fill="#34A853" d="M12 12c-2.21 0-4-1.79-4-4s1.79-4 4-4v8z" />
    <path fill="#FBBC05" d="M12 12c2.21 0 4 1.79 4 4s-1.79 4-4 4v-8z" />
    <path fill="#EA4335" d="M12 12c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4z" />
  </svg>
);

export const AnsibleIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9l-4-4v8l4-4zm4 0l4-4v8l-4-4z"/>
    </svg>
);

export const TestingIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const GitIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M18 6V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2" />
    <line x1="6" y1="9" x2="6" y2="21" />
  </svg>
);

export const PythonIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="#306998" {...props}>
        <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,18c-1.66,0-3-1.34-3-3s1.34-3,3-3 c1.66,0,3,1.34,3,3S13.66,18,12,18z M12,6c-1.66,0-3,1.34-3,3s1.34,3,3,3c1.66,0,3-1.34,3-3S13.66,6,12,6z"/>
    </svg>
);

export const GoIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 190 190" fill="#00ADD8" {...props}>
        <path d="M95,33.8c-10.4,0-19.8,2.7-27.9,8c-1,0.6-1.8,1.4-2.5,2.3c-2,2.4-3.5,5.2-4.5,8.3c-0.6,1.9-0.9,3.9-1.1,5.8 c-0.1,2.5-0.1,5,0.1,7.5c0.6,7.8,3.3,15.1,7.6,21.5c4.7,6.8,11.1,12.2,18.7,15.4c8.1,3.4,17,4.5,25.8,3.2c8.8-1.3,16.8-4.9,23.3-10.3 c6.2-5.1,10.9-11.7,13.5-19.3c1.3-3.9,2-8.1,1.9-12.3c-0.1-4.7-1.3-9.4-3.3-13.7c-2.3-4.8-5.6-9-9.6-12.2c-4-3.3-8.8-5.7-14-6.9 C104.2,34.2,99.6,33.8,95,33.8z"/>
        <path fill="#FFFFFF" d="M96.1,123.3c-2,0-3.9-0.2-5.7-0.5c-4.4-0.8-8.2-3-11.2-6.3c-1-1.1-1.9-2.3-2.6-3.6c-0.5-0.9-1-1.9-1.3-2.9 c-0.4-1.2-0.6-2.5-0.7-3.8c-0.1-2.4,0.3-4.8,1.2-7c0.8,2.1,1.9,4.1,3.4,5.9c3.1,3.8,7.3,6.3,12.2,7c1.3,0.2,2.7,0.3,4,0.3 c3.2,0,6.4-0.6,9.3-1.8c2.9-1.2,5.5-2.9,7.6-5.1c2.1-2.2,3.6-4.8,4.5-7.6c0.8-2.6,1.1-5.3,0.8-7.9c-0.3-2.9-1.2-5.7-2.6-8.3 c-1.5-2.8-3.6-5.3-6.1-7.2c-2.4-1.8-5.2-3.1-8.1-3.7c-3-0.7-6-0.6-8.9,0.1c-2.8,0.7-5.5,2-7.8,3.8c-1.3,1-2.5,2.2-3.6,3.5 c-1,1.2-1.9,2.5-2.7,3.9c-0.6,1.2-1.1,2.4-1.5,3.6c-0.4,1.4-0.6,2.8-0.7,4.3c-0.1,2.7,0.4,5.3,1.4,7.8c2,5.1,5.6,9.1,10.3,11.5 c4.7,2.4,10,3.1,15.1,2c5-1.1,9.4-3.9,12.8-7.9c1-1.2,1.8-2.5,2.5-3.8c0.5-1,0.9-2,1.2-3.1c0.4-1.1,0.6-2.3,0.7-3.5 c0.1-2.2-0.3-4.4-1.1-6.5c-0.7,2-1.8,3.9-3.2,5.6c-2.9,3.5-6.9,5.8-11.5,6.5C100.1,123.1,98.1,123.3,96.1,123.3z"/>
    </svg>
);

export const RustIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M2.2,12.18L8.14,9.43V2.91L2.2,5.66V12.18M2.2,12.82V19.34L8.14,22.09V15.57L2.2,12.82M8.7,15.7V22.69L15.3,19.54V12.61 L8.7,15.7M21.8,12.18V5.66L15.86,2.91V9.43L21.8,12.18M15.86,15.57V22.09L21.8,19.34V12.82L15.86,15.57M15.3,9.54L8.7,12.39V2.31 L15.3,5.46V9.54Z" />
    </svg>
);

export const LangFlowIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="6" cy="6" r="3"></circle>
        <circle cx="18" cy="18" r="3"></circle>
        <path d="M6 9v6a3 3 0 0 0 3 3h3"></path>
        <path d="M18 15V9a3 3 0 0 0-3-3h-3"></path>
    </svg>
);

export const HTMLIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
);

export const CSSIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
);

export const JSIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" {...props}>
        <rect width="24" height="24" rx="4" fill="#F0DB4F" />
        <path d="M7.5 16.5h2.46c.55 0 .88-.08 1.1-.25.22-.17.33-.42.33-.75 0-.32-.09-.58-.28-.78-.19-.2-.51-.3-.98-.3h-.6v-1.4h.57c.42 0 .73-.1.94-.3.21-.2.31-.48.31-.85 0-.33-.1-.58-.3-.75-.2-.17-.5-.25-.9-.25-.37 0-.66.08-.87.25-.21.17-.31.4-.31.7H8.2c0-.5.17-.92.5-1.25.33-.33.8-.5 1.4-.5.6 0 1.08.15 1.44.45.36.3.54.7.54 1.2 0 .37-.1.68-.3.9-.2.22-.5.38-.9.45v.1c.5.07.9.25 1.2.55.3.3.45.7.45 1.2s-.15.9-.45 1.2c-.3.3-.7.45-1.2.45-.6 0-1.08-.16-1.44-.48-.36-.32-.54-.74-.54-1.25h1.6c0 .3.05.5.15.6s.25.15.45.15c.2 0 .35-.05.45-.15s.15-.25.15-.45c0-.2-.05-.35-.15-.45s-.25-.15-.45-.15h-1z" fill="#323330"/>
        <path d="M15.2 16.5h1.6c.5 0 .9-.1 1.2-.3.3-.2.45-.5.45-.9s-.15-.7-.45-1c-.3-.3-.7-.45-1.2-.45-.5 0-.9.15-1.2.45-.3.3-.45.6-.45 1h-1.6c0-.8.27-1.5.8-2.1.53-.6 1.2-.9 2-.9.8 0 1.47.3 2 .9.53.6.8 1.3.8 2.1s-.27 1.5-.8 2.1c-.53-.6-1.2.9-2 .9-.55 0-1.02-.1-1.4-.3l-.5 1.1z" fill="#323330"/>
    </svg>
);

export const TauriIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.72,2.32L9.5,4.5l-2.12,3.67c-1.35,2.34-2.12,5-2.12,7.83h13.5c0-2.83-0.77-5.49-2.12-7.83L14.5,4.5L12.72,2.32z M12,17.5 c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,17.5,12,17.5z" />
    </svg>
);

export const SlidersIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

export const BrainIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15A2.5 2.5 0 0 1 9.5 22" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5" />
    <path d="M5 12H2.5A2.5 2.5 0 0 1 0 9.5v-5A2.5 2.5 0 0 1 2.5 2" />
    <path d="M19 12h2.5a2.5 2.5 0 0 0 2.5-2.5v-5A2.5 2.5 0 0 0 21.5 2" />
  </svg>
);

export const WandIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L11.28 9.6l-1.6 1.6 2.83 2.83 6.72-6.72a1.21 1.21 0 0 0 0-1.72z" />
    <path d="m14 7-8 8" />
    <path d="M6 21h4" />
    <path d="M14 3h4" />
  </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const AnnotationIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const GoogleIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.54,18.33 21.54,12.81C21.54,11.76 21.45,11.44 21.35,11.1Z" />
    </svg>
);

export const EmailIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0 1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

export const LockIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

export const GitHubIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

export const InstagramIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
    </svg>
);

// ... rest of the file ...
export const SaveIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

export const EditIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

export const BookIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v2H6.5A2.5 2.5 0 0 1 4 16.5v-11A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 1 4 14.5v-1" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

export const CrownIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
        <path d="M5 20h14" />
    </svg>
);

export const PlusIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

export const TerminalIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
);

export const BashLogoIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" className="animate-blink" />
  </svg>
);

export const ReduxIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#764ABC" strokeWidth="1.5" {...props}>
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm3.32 14.68c-.14.33-.44.52-.76.52-.31 0-.62-.18-.75-.51l-2.82-7.04h-.02l-2.8 7.04c-.13.33-.44.51-.75.51-.33 0-.63-.19-.76-.52-.14-.33-.08-.7.16-1.02l3.52-8.54c.14-.34.45-.53.77-.53s.63.19.77.53l3.52 8.54c.24.32.29.69.15 1.02z"/>
    </svg>
);

export const TailwindCssIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" {...props}>
        <path d="M12 12c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0 0c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"/>
    </svg>
);

export const TypescriptIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="#3178C6" {...props}>
        <path d="M2 2h20v20H2z"/>
        <path fill="#fff" d="M12.58 15.32h-1.6V9.75L9.36 10.9v-1.4l3-1.23h.22v7.05zm5.1-4.26c0-.98-.3-1.7-.88-2.18-.58-.48-1.42-.72-2.52-.72-.92 0-1.7.18-2.34.54s-1.1.88-1.4 1.58l1.4.66c.2-.42.48-.75.83-1 .34-.24.75-.36 1.22-.36.56 0 1.02.13 1.38.4.36.26.54.66.54 1.2v.38c-1.32-.02-2.32.3-2.98.96-.66.66-.98 1.54-.98 2.64 0 .9.28 1.63.84 2.2.56.56 1.3.84 2.22.84.86 0 1.58-.23 2.16-.7.58-.46.94-1.1.94-1.92h-1.6c-.08.4-.24.7-.48.9-.24.2-.55.3-.92.3-.5 0-.9-.13-1.2-.4-.3-.26-.44-.65-.44-1.16 0-.38.08-.7.24-1s.4-.5.72-.64c.32-.14.7-.22 1.14-.22h.96v-.72z"/>
    </svg>
);

export const LinkIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

export const FileCodeIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m10 13-2 2 2 2" />
        <path d="m14 17 2-2-2-2" />
    </svg>
);

export const LayersIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
    </svg>
);

export const SlidersHorizontalIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="21" y1="10" x2="3" y2="10" />
        <line x1="18" y1="6" x2="3" y2="6" />
        <line x1="21" y1="14" x2="3" y2="14" />
        <line x1="18" y1="18" x2="3" y2="18" />
    </svg>
);
export const GridIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

export const CodeBranchIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
    </svg>
);

export const MenuIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

export const PlayIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M8 5v14l11-7z" />
    </svg>
);

export const ChevronsLeftIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="11 17 6 12 11 7" />
        <polyline points="18 17 13 12 18 7" />
    </svg>
);

export const ChevronsRightIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="13 17 18 12 13 7" />
        <polyline points="6 17 11 12 6 7" />
    </svg>
);

export const MessageSquareIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);


export const getAgentIcon = (agent: Agent): React.FC<IconProps> => {
    switch(agent) {
        case Agent.AutoEngine: return SparklesIcon;
        case Agent.CPPAutomator: return AIIcon;
        case Agent.LangFlowAutomator: return LangFlowIcon;
        case Agent.ReactAutomator: return ReactIcon;
        case Agent.SaaSStarterAutomator: return SaaSIcon;
        case Agent.NodeAutomator: return NodeJSIcon;
        case Agent.DeployAutomator: return RocketIcon;
        case Agent.DockerAutomator: return DockerIcon;
        case Agent.SQL: return SqlIcon;
        case Agent.VueAutomator: return VueIcon;
        case Agent.CICDAutomator: return GitHubActionsIcon;
        case Agent.DatabaseAutomator: return PostgresqlIcon;
        case Agent.MobileDevAutomator: return MobileIcon;
        case Agent.APIAutomator: return APIIcon;
        case Agent.NextJSAutomator: return NextJSIcon;
        case Agent.AngularAutomator: return AngularIcon;
        case Agent.SvelteAutomator: return SvelteIcon;
        case Agent.TerraformAutomator: return TerraformIcon;
        case Agent.AWSAutomator: return AWSIcon;
        case Agent.GCPAutomator: return GCPIcon;
        case Agent.AnsibleAutomator: return AnsibleIcon;
        case Agent.TestingAutomator: return TestingIcon;
        case Agent.GitAutomator: return GitIcon;
        case Agent.PythonScriptAutomator: return PythonIcon;
        case Agent.GoAutomator: return GoIcon;
        case Agent.RustAutomator: return RustIcon;
        case Agent.ZenityAutomator: return TerminalIcon;
        case Agent.YadAutomator: return TerminalIcon;
        case Agent.HTMLAutomator: return HTMLIcon;
        case Agent.CSSAutomator: return CSSIcon;
        case Agent.JSAutomator: return JSIcon;
        case Agent.TauriAutomator: return TauriIcon;
        default: return AIIcon;
    }
};

export const getOSIcon = (os: OperatingSystem): React.FC<IconProps> => {
    switch(os) {
        case OperatingSystem.Windows: return WindowsIcon;
        // Fix: Changed Agent.Linux to OperatingSystem.Linux, as Agent enum does not have a Linux member.
        case OperatingSystem.Linux: return LinuxIcon;
        default: return TerminalIcon;
    }
};
