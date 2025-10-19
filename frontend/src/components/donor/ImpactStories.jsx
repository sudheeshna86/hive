import React from "react";
import { Heart, MapPin, Calendar, Users } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

export default function ImpactStories() {
  const impactStories = [
    {
      id: "story-1",
      title: "Medical Treatment Saved Maria's Life",
      beneficiary: "Maria Rodriguez",
      location: "Guatemala City, Guatemala",
      date: "2024-01-15",
      category: "Medical",
      donationAmount: 500,
      story:
        "Thanks to your generous donation, Maria was able to receive the life-saving surgery she desperately needed. The 45-year-old mother of three had been suffering from a heart condition that required immediate intervention. Your contribution covered the surgical costs and post-operative care. Maria is now recovering well and has returned to caring for her family.",
      image: "/happy-woman-with-family.jpg",
      impact: "1 life saved, 3 children can keep their mother",
    },
    {
      id: "story-2",
      title: "Education Fund Helps 20 Children",
      beneficiary: "Village School Project",
      location: "Rural Kenya",
      date: "2024-02-20",
      category: "Education",
      donationAmount: 250,
      story:
        "Your donation was part of a larger fund that provided school supplies, uniforms, and meals for 20 children in a rural Kenyan village. These children, who previously couldn't afford to attend school, are now receiving quality education. The project has a 95% attendance rate and the children are excelling in their studies.",
      image: "/children-in-school-uniforms-studying.jpg",
      impact: "20 children now have access to education",
    },
    {
      id: "story-3",
      title: "Emergency Shelter After Natural Disaster",
      beneficiary: "The Johnson Family",
      location: "Philippines",
      date: "2024-03-10",
      category: "Emergency",
      donationAmount: 300,
      story:
        "When Typhoon Maring destroyed the Johnson family's home, they were left with nothing. Your emergency donation helped provide temporary shelter, clean water, and basic necessities for the family of five. They've since been able to rebuild their home and are back on their feet, grateful for the support during their darkest hour.",
      image: "/family-rebuilding-home-after-disaster.jpg",
      impact: "1 family housed, 5 people given hope",
    },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case "Medical":
        return "badge bg-danger bg-opacity-25 text-danger";
      case "Education":
        return "badge bg-primary bg-opacity-25 text-primary";
      case "Emergency":
        return "badge bg-warning bg-opacity-25 text-warning";
      case "Food":
        return "badge bg-success bg-opacity-25 text-success";
      default:
        return "badge bg-secondary bg-opacity-25 text-secondary";
    }
  };

  return (
    <div className="container py-3">
      <div className="text-center mb-5">
        <h3 className="fw-bold fs-4 mb-2">Your Impact in Action</h3>
        <p className="text-muted">
          See how your donations have changed lives around the world
        </p>
      </div>

      <div className="row g-4">
        {impactStories.map((story) => (
          <div key={story.id} className="col-12 col-lg-6">
            <div className="card shadow-sm border-0 h-100 animate__animated animate__fadeInUp">
              <div className="ratio ratio-16x9">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-100 h-100 object-fit-cover rounded-top"
                />
              </div>

              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className={getCategoryColor(story.category)}>
                    {story.category}
                  </span>
                  <small className="text-muted d-flex align-items-center gap-1">
                    <Calendar size={14} />{" "}
                    {new Date(story.date).toLocaleDateString()}
                  </small>
                </div>

                <h5 className="fw-semibold">{story.title}</h5>
                <div className="d-flex flex-wrap gap-3 text-muted small mb-3">
                  <span className="d-flex align-items-center gap-1">
                    <Users size={14} /> {story.beneficiary}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <MapPin size={14} /> {story.location}
                  </span>
                </div>

                <p className="text-muted small lh-base">{story.story}</p>

                <div className="p-3 border rounded-3 bg-primary bg-opacity-10 mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small fw-semibold">Your Contribution</span>
                    <span className="fw-bold text-primary fs-6">
                      ${story.donationAmount}
                    </span>
                  </div>
                  <small className="text-muted">
                    <strong>Impact:</strong> {story.impact}
                  </small>
                </div>

                <div className="d-flex align-items-center gap-2 pt-3">
                  <Heart size={16} className="text-danger" fill="currentColor" />
                  <span className="text-muted small">
                    Thank you for making this possible
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {impactStories.length === 0 && (
          <div className="text-center py-5">
            <div className="rounded-circle bg-light mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: "64px", height: "64px" }}>
              <Heart size={28} className="text-secondary" />
            </div>
            <h5 className="fw-semibold mb-2">No impact stories yet</h5>
            <p className="text-muted">
              Once your donations help complete cases, you'll see the amazing
              impact stories here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
