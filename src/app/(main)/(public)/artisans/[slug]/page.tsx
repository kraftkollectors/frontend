import About from "./About";
import MyServices from "./MyServices";
import Profile from "./Profile";
import Reviews from "./Reviews";

export default function Page() {
  return (
    <>
    <section className="app-container py-10">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-6">
        <Profile
          skills={["Music producer",
            "Song writer",
            "Sound engineer",
            "Sound developer"]}
          name="John Doe Anam"
          location="Abuja"
          img="/images/auth-bg.png"
          title="3D animator & video editor"
         />
        <About
        about="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          nihil incidunt veniam quos nemo neque perspiciatis, ab unde asperiores
          aliquid excepturi. Beatae possimus placeat distinctio exercitationem
          iste fugiat corporis debitis dicta aspernatur ab. Ipsum eaque ad
          ducimus sequi qui quidem nostrum aut nisi nesciunt, necessitatibus
          itaque soluta impedit aliquam, tempora alias voluptates saepe. Quis
          illo voluptatibus tempora, impedit unde nobis dolorum sint suscipit
          hic aliquam ad iusto atque sapiente nesciunt blanditiis consectetur
          exercitationem laudantium neque omnis quisquam harum! Aliquid sequi
          reiciendis pariatur recusandae quas optio ipsum iure omnis quos nobis
          exercitationem, sint sed sit eius fugit officia adipisci repellendus"
          education={[
            {
              school: "Federal University of Technology Owerri",
              degree: "OND"
            }
          ]}
          socials={
            {
              instagram: "https:instagram.com/abundiko",
              x: "https:x.com/@abundiko",
              facebook: "https:facebook.com/abundiko",
              linkedin: "https:linkedin.com/in/abundiko",
            }
          }
         />
      </div>
    </section>
    <MyServices />
    <Reviews />
    </>
  );
}
