// This file is for DOM Manipulation related features
// Can be used to create

// Creates and returns an element
const buildElement = (elementType, elementId, elementClass) => {
    let newElement = document.createElement(elementType);
    if (elementId)
        newElement.id = elementId;
    if (elementClass)
        newElement.classList.add(elementClass);
    return newElement;
};

const loadLeftSidebar = () => {
    // Create div
    document.body.appendChild(buildElement('div', 'sidebar'));
    
};

export {buildElement};