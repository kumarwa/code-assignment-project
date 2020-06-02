> ## This app has build with following features
>
> - Show results in a card grid format with the image prominently displayed.
> - Each card displays: Image, Name, Text, Set Name, and Type.
> - Display a loading indicator when communicating with the API.
> - Accommodates, at minimum, desktop and mobile.
> - Initial fetch display the first 20 results returned by the API.
> - Use custom **useInfiniteScroll** Component to handle Infinte Scrolling.
> - Get additional pages with not load more than 20 cards for each request.
> - Allow the user to search for cards by Name.
> - Implemented with using **React hooks** and **React functional Components**.

#### Additionally, below functionality have also been incorporated.

> Search functionality allows you to search for a specific card name and if no card
> data found for that search criteria then displays **No results found**

> Displays **Error Encountered** when netwrok call fails during fetch request.

> Dispaly **End Of Page** once no more records to scroll.

In order to run the app locally, please execute below steps from command line run.

1. Clone this repo
2. yarn install
3. yarn start

If you ran into any issues due to dependecy problem with babel-jest, you may need to follow thru the steps as suggested to correct it and worst case if could not able to fix it simply create .env in your project folder and add **SKIP_PREFLIGHT_CHECK=true** to .env and yarn start. This would address the issue.
