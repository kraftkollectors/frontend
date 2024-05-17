import About from "./About";
import MyServices from "./MyServices";
import Profile from "./Profile";
import Reviews from "./Reviews";

export default function Page() {
  return (
    <>
      <section className="app-container py-10 bg-light-text">
        <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-11 gap-4 md:gap-6">
          <Profile
            // skills={[
            //   "Music producer",
            //   "Song writer",
            //   "Sound engineer",
            //   "Sound developer",
            // ]}
            memberSince="2004"
            socials={{
              x: "b",
              instagram: "n",
              facebook: "j",
              linkedin: "k",
            }}
            name="John Doe Anam"
            location="Abuja"
            img="/images/auth-bg.png"
            profession="3D animator & video editor"
          />
          <About
            about="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          nihil incidunt veniam quos nemo neque perspiciatis, ab unde asperiores
          aliquid excepturi. Beatae possimus placeat distinctio exercitationem
          iste fugiat corporis debitis dicta aspernatur ab. Ipsum eaque ad
          ducimus sequi qui quidem nostrum aut nisi nesciunt, necessitatibus
          itaque soluta impedit aliquam, tempora alias voluptates saepe. Quis
          exercitationem, sint sed sit eius fugit officia adipisci repellendus"
            education={[
              {
                universityName: "Federal University of Technology Owerri",
                degree: "OND",
                areaOfStudy: "Health science",
                graduation: "2023",
                id: "1",
              },
            ]}
            certifications={[
              {
                certifiedBy: "Federal University of Technology Owerri",
                certificate: "OND",
                year: "2023",
                id: "1",
              },
            ]}
          />
        </div>
      </section>
      <MyServices />
      <Reviews />
    </>
  );
}
