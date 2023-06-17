export default function SidebarIcon({ icon, onClick, onKeyDown }) {
  return (
    <div
      role="button"
      className="relative flex items-center justify-center cursor-pointer h-12 w-12 mb-2 mx-auto top-2 shadow-lg bg-gray-700 text-green-500 rounded-3xl hover:text-white hover:rounded-xl transition-all duration-100 ease-linear group"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {icon}
    </div>
  );
}
