FROM archlinux as base
WORKDIR /opt/Shulgin
COPY ./Backend/shulgin ./shulgin
COPY ./Backend/dist ./dist
RUN pacman -Syu --noconfirm
RUN pacman -Sy base-devel --noconfirm
RUN useradd -m -d /opt/Shulgin shulgin
RUN chown -R shulgin:shulgin /opt/Shulgin
USER shulgin
EXPOSE 8080 
CMD ["/opt/Shulgin/shulgin"]