export type Locale = 'vi' | 'en' | 'ko'

const translations = {
  vi: {
    adminAccess: 'Cổng đăng nhập Quản trị',
    rocket: 'Rocket',
    administration: 'Quản trị hệ thống',
    adminSignIn: 'Đăng nhập Quản trị viên',
    adminIdentifier: 'Tài khoản quản trị',
    password: 'Mật khẩu',
    showPassword: 'Hiện mật khẩu',
    signIn: 'Đăng nhập',
    rocketLogo: 'Logo Rocket',
    emailOrSupportedIdentifier: 'Email hoặc tài khoản quản trị',
    enterYourPassword: 'Nhập mật khẩu',
  },
  en: {
    adminAccess: 'Admin Access',
    rocket: 'Rocket',
    administration: 'Administration',
    adminSignIn: 'Admin Sign In',
    adminIdentifier: 'Admin identifier',
    password: 'Password',
    showPassword: 'Show Password',
    signIn: 'Sign In',
    rocketLogo: 'Rocket logo',
    emailOrSupportedIdentifier: 'Email or supported identifier',
    enterYourPassword: 'Enter your password',
  },
  ko: {
    adminAccess: '관리자 로그인',
    rocket: 'Rocket',
    administration: '시스템 관리',
    adminSignIn: '관리자 로그인',
    adminIdentifier: '관리자 계정',
    password: '비밀번호',
    showPassword: '비밀번호 표시',
    signIn: '로그인',
    rocketLogo: 'Rocket 로고',
    emailOrSupportedIdentifier: '이메일 또는 관리자 ID',
    enterYourPassword: '비밀번호를 입력하세요',
  },
} as const

export function getAdminAccessCopy(locale: Locale) {
  return translations[locale]
}
