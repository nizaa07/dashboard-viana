import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();
  const footerRoutes = [
    { name: "About Us", path: "https://citylab.itb.ac.id/sccic2/about-us/" },
    { name: "Blog", path: "https://citylab.itb.ac.id/sccic2/category/blog/" },
    {
      name: "Latest News",
      path: "https://citylab.itb.ac.id/sccic2/category/news/",
    },
  ];

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          Smart City & Community Innovation Center
        </Typography>
        <ul className="flex items-center gap-4">
          {footerRoutes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Smart City & Community Innovation Center",
  brandLink: "https://citylab.itb.ac.id/sccic2/",
  routes: [
    { name: "About Us", path: "https://citylab.itb.ac.id/sccic2/about-us/" },
    { name: "Blog", path: "https://citylab.itb.ac.id/sccic2/category/blog/" },
    {
      name: "Latest News",
      path: "https://citylab.itb.ac.id/sccic2/category/news/",
    },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
