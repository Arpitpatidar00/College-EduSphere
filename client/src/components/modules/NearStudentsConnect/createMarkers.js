// utils/createMarkers.js

// 🔸 Marker: Normal student avatar
export const createAvatarIcon = (imgUrl, name = "") =>
  L.divIcon({
    html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="border-radius:50%; overflow:hidden; width:40px; height:40px; box-shadow: 0 0 4px rgba(0,0,0,0.3);">
                <img src="${imgUrl}" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="margin-top: 2px; font-size: 10px; font-weight: 500; background: white; padding: 1px 4px; border-radius: 4px;">
                ${name}
            </div>
        </div>
        `,
    className: "",
    iconSize: [40, 48],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

// 🔹 Marker: Highlighted current user
export const createCurrentUserIcon = (imgUrl) =>
  L.divIcon({
    html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="border-radius:50%; overflow:hidden; width:56px; height:56px;
                box-shadow: 0 0 12px 6px rgba(0,123,255,0.6); border: 2px solid white; z-index: 999;">
                <img src="${imgUrl}" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="margin-top: 2px; font-size: 11px; font-weight: 600; color: #007bff;">
                You
            </div>
        </div>
        `,
    className: "",
    iconSize: [56, 64],
    iconAnchor: [28, 56],
    popupAnchor: [0, -56],
  });
