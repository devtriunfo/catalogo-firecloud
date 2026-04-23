const CatalogoFireCloud = () => {
  return (
    <section
      style={{
        width: "100%",
        height: "clamp(200px, 60vw, 500px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "cover",
        }}
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-04-16%20at%2017.47.07-3HspEm4ytxIQreEFRPtfVrknZ54pv7.mp4"
          type="video/mp4"
        />
      </video>
    </section>
  );
};

export default CatalogoFireCloud;
