import ErrorHandle from "../components/ui/ErrorHandle";
import MainNavigation from "../components/layout/MainNavigation";

function Error() {
  return (
    <>
      <MainNavigation />
      <ErrorHandle>
        <p>This route could not found. Please dobule check the URL</p>
      </ErrorHandle>
    </>
  );
}

export default Error;
