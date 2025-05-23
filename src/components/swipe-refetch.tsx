// "use client";
// import React from "react";
// import { useSwipeable } from "react-swipeable";

// function SwipeRefetch() {
//   const [swipeDeltaY, setSwipeDeltaY] = React.useState(0);

//   const handlers = useSwipeable({
//     onSwiping: (eventData) => {
//       if (window.scrollY === 0 && eventData.dir === "Up") {
//         setSwipeDeltaY(eventData.deltaY);
//       }
//     },
//     onSwipedDown: (eventData) => {
//       if (window.scrollY === 0 && eventData.deltaY > 50) {
//         refetch();
//       }
//       setSwipeDeltaY(0);
//     },
//     onSwiped: () => {
//       setSwipeDeltaY(0); // reset on any swipe
//     },
//     preventScrollOnSwipe: true,
//     trackTouch: true,
//     delta: 10,
//   });
//   return (
//     <div>
//       {/* Indicator */}
//       <div
//         className="absolute top-0 left-0 right-0 flex justify-center items-center transition-all duration-200 ease-out"
//         style={{
//           height: swipeDeltaY > 0 ? Math.min(swipeDeltaY, 80) : 0,
//           opacity: swipeDeltaY > 20 ? 1 : 0,
//         }}
//       >
//         {isRefetching ? (
//           <div className="text-sm text-blue-500">Refreshing...</div>
//         ) : (
//           <div className="text-sm text-gray-500">Swipe up to refresh</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SwipeRefetch;
