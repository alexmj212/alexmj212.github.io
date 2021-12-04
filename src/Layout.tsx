import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
  const navigate = (navItem) => {
    if (!navItem) {
      return
    }
    var page = navItem.id.substring(0, navItem.id.lastIndexOf('-'));
    //document.getElementsByTagName(page)[0].scrollIntoView({ behavior: "smooth", block: "center" });

    var headerOffset = 50;
    var elementPosition = document.getElementsByTagName(page)[0].getBoundingClientRect().top + window.pageYOffset;
    var offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <main>
        <>
          <Sidebar navigate={navigate} />
          <article>
            {/* <>
                            <header-page class="page"></header-page>
                            <profile-page class="page"></profile-page>
                            <portfolio-page class="page"></portfolio-page>
                            <skills-page class="page"></skills-page>
                            <education-page class="page"></education-page>
                            <resume-page class="page"></resume-page>
                        </> */}
          </article>
        </>
      </main>
      {/* <modal-element></modal-element> */}
    </>
  );
};

export default Layout;
