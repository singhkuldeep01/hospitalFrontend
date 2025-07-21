import React from 'react'

function ThemeSelector() {
  const themes = [
    'light',
    'dark',
    'cupcake',
    'forest',
    'valentine',
    'emerald',
    'corporate',
    'business',
    'luxury',
    'retro',
    'synthwave',
    'cyberpunk',
    'acid',
    'bumblebee',
    'dracula',
    'fantasy',
    'halloween',
    'winter',
    'autumn',
    'garden'
  ];

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>

      <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-40 p-2 shadow-2xl space-y-1 max-h-80 overflow-y-auto">
        {themes.map((theme) => (
          <li key={theme}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller w-full btn btn-sm btn-ghost justify-start"
              aria-label={theme.charAt(0).toUpperCase() + theme.slice(1)}
              value={theme}
              defaultChecked={theme === 'light'}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThemeSelector;
