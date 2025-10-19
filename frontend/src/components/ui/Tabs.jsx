import React from "react";

function Tabs({ children, defaultActiveKey, className = "", ...props }) {
  const [activeKey, setActiveKey] = React.useState(defaultActiveKey);

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  // Add active class to children based on eventKey
  const tabsWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, { activeKey, onSelect: handleSelect });
  });

  return <div className={className} {...props}>{tabsWithProps}</div>;
}

function TabList({ children, className = "", ...props }) {
  return (
    <ul className={`nav nav-tabs ${className}`} {...props}>
      {children}
    </ul>
  );
}

function Tab({ eventKey, title, activeKey, onSelect, className = "", ...props }) {
  const isActive = activeKey === eventKey;
  return (
    <li className="nav-item" {...props}>
      <button
        className={`nav-link ${isActive ? "active" : ""} ${className}`}
        onClick={() => onSelect(eventKey)}
      >
        {title}
      </button>
    </li>
  );
}

function TabContent({ children, activeKey, className = "", ...props }) {
  return (
    <div className={`tab-content ${className}`} {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeKey })
      )}
    </div>
  );
}

function TabPane({ eventKey, children, activeKey, className = "", ...props }) {
  const isActive = activeKey === eventKey;
  return (
    <div
      className={`tab-pane fade ${isActive ? "show active" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabList, Tab, TabContent, TabPane };
