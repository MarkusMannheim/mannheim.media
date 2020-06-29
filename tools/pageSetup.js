function pageSetup() {
  // brand colours
  blue = d3.hsl("#375E97");
  orange = d3.hsl("#FB6542");
  green = d3.hsl("#3F681C");
  yellow = d3.hsl("#FFBB00");
  slate = d3.hsl("slategrey");

  // constants
  background = d3.select("body")
    .append("div")
      .attr("id", "background");
  container = d3.select("body")
    .append("div")
      .attr("id", "container");
  navMenu = d3.select("body")
    .append("div")
      .attr("id", "navMenu");
  copyrightAnchor = d3.select("body")
    .append("div")
      .attr("id", "copyrightAnchor")
      .html("&#9432;")
      .on("click", copyrightSwitch);
  contactScreen = d3.select("body")
    .append("div")
      .attr("id", "contactScreen")
      .on("click", contactSwitch);

  // copyright notices
  copyrightToggle = false;
  copyrightPanel = copyrightAnchor
    .append("div")
      .attr("id", "copyrightPanel")
      .html("website design and coding: &copy; Markus Mannheim<br>"
          + "D3 library: &copy; <a href='https://d3js.org/'>Mike Bostock</a><br>"
          + "all coding, including D3, covered by <a href='https://opensource.org/licenses/BSD-3-Clause'>BSD-3-clause</a>");
  function copyrightSwitch() {
    copyrightToggle = !copyrightToggle;
    copyrightPanel.classed("inverse", copyrightToggle);
  }

  // nav menu
  navToggle = false;
  navData = [
    ["home", "home", "../index.html"],
    ["about", "about me", "../pages/about.html"],
    ["dataviz", "data viz", "../pages/dataviz.html"],
    ["contact", "contact", ""]
  ];
  navMenuButton = navMenu
    .append("div")
      .attr("id", "navMenuButton")
      .html("&#9776;")
      .on("click", navSwitch);
  navMenu.selectAll("div")
      .data(navData)
    .enter().append("div")
      .classed("navOption", true)
      .attr("id", function(d) {return "nav" + d[0][0].toUpperCase() + d[0].slice(1); })
      .append("a")
        .text(function(d) { return d[1].toUpperCase(); })
        .each(function(d) {
          if (d[2] !=="") {
            d3.select(this).attr("href", function(d) { return d[2]; });
          }
        });
  function navSwitch() {
    navToggle = !navToggle;
    navMenu.classed("inverse", navToggle);
  }

  // contact menu
  contactToggle = false;
  d3.select("#navContact")
    .on("click", contactSwitch);
  contactMenu = contactScreen
    .append("div")
      .attr("id", "contactMenu");
  contactData = [
    ["email", "../media/iconEmail.svg", "mailto:markus@mannheim.media?subject=Website enquiry"],
    ["phone", "../media/iconPhone.svg", "tel:+61-4-2828-0114"],
    ["twitter", "../media/iconTwitter.svg", "https://twitter.com/MarkusMannheim"],
    ["facebook", "../media/iconFacebook.svg", "https://www.facebook.com/MarkusWMannheim"],
    ["linkedIn", "../media/iconLinkedIn.svg", "https://www.linkedin.com/in/markusmannheim/"]
  ],
  contactMenu.selectAll(".contactOption")
      .data(contactData)
    .enter().append("a")
      .classed("contactOption", true)
      .attr("id", function(d) { return "contact" + d[0].substring(0, 1).toUpperCase() + d[0].substring(1); })
      .attr("href", function(d) { return d[2]; })
      .each(function(d) {
        d3.xml(d[1])
          .mimeType("image/svg+xml")
          .get(function(error, xml) {
            if (error) throw error;
            document.getElementById("contact" + d[0].substring(0, 1).toUpperCase() + d[0].substring(1))
              .appendChild(xml.documentElement);
          });
      });
  d3.xml("../media/iconClose.svg")
    .mimeType("image/svg+xml")
    .get(function(error, xml) {
      if (error) throw error;
      document.body.appendChild(xml.documentElement);
      contactClose = d3.select("#iconClose")
        .on("click", contactSwitch);
    });
  function contactSwitch() {
    contactToggle = !contactToggle;
    contactScreen.classed("inverse", contactToggle);
    contactClose.classed("inverse", contactToggle);
    contactClose.style("top", contactMenu.node().getBoundingClientRect().top - 25 + "px")
      .style("left", contactMenu.node().getBoundingClientRect().right - 25 + "px");
  }

  // window resize
  window.addEventListener("resize", resizeWindow);
  function resizeWindow() {
    contactClose.style("top", contactMenu.node().getBoundingClientRect().top - 25 + "px")
      .style("left", contactMenu.node().getBoundingClientRect().right - 25 + "px");
  }

  // initial fade in
  d3.select("body")
    .transition()
      .duration(1000)
      .style("opacity", 1);
}
